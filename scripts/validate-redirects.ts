import fs from 'fs';
import path from 'path';

interface RedirectRow {
    oude_url: string;
    nieuwe_url: string;
    status_code: string;
    beslissing: string;
    reden: string;
}

function parseCsv(filePath: string): RedirectRow[] {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');

    const rows: RedirectRow[] = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Simple CSV parser supporting quotes
        const columns: string[] = [];
        let current = '';
        let inQuotes = false;
        for (let charIndex = 0; charIndex < line.length; charIndex++) {
            const char = line[charIndex];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                columns.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        columns.push(current);

        if (columns.length >= 3) {
            rows.push({
                oude_url: columns[0].trim(),
                nieuwe_url: columns[1].trim(),
                status_code: columns[2].trim(),
                beslissing: columns[3] ? columns[3].trim() : '',
                reden: columns[4] ? columns[4].trim() : '',
            });
        }
    }
    return rows;
}

function validateRedirects() {
    const csvPath = path.resolve(process.cwd(), 'redirects-mapping.csv');
    if (!fs.existsSync(csvPath)) {
        console.error(`❌ Error: CSV mapping file not found at ${csvPath}`);
        process.exit(1);
    }

    const redirects = parseCsv(csvPath);
    console.log(`🔍 Auditing ${redirects.length} redirects...`);

    let errors = 0;
    let warnings = 0;

    const redirectMap = new Map<string, string>();
    const statusMap = new Map<string, string>();

    // 1. Build maps and check basic issues
    for (const row of redirects) {
        const { oude_url, nieuwe_url, status_code, beslissing } = row;

        if (!oude_url) {
            console.error(`❌ Error: Row with missing oude_url`);
            errors++;
            continue;
        }

        if (beslissing === 'vervallen') {
            if (status_code !== '410') {
                console.warn(
                    `⚠️ Warning: URL ${oude_url} is marked as 'vervallen' but status code is not 410 (found: ${status_code})`,
                );
                warnings++;
            }
            continue;
        }

        if (!nieuwe_url) {
            console.warn(
                `⚠️ Warning: URL ${oude_url} has no destination, and is not marked as 'vervallen'.`,
            );
            warnings++;
            continue;
        }

        if (oude_url === nieuwe_url) {
            console.error(
                `❌ Error: Self-redirect (loop) detected on ${oude_url}`,
            );
            errors++;
            continue;
        }

        if (redirectMap.has(oude_url)) {
            console.error(
                `❌ Error: Duplicate redirect defined for ${oude_url}`,
            );
            errors++;
        }

        redirectMap.set(oude_url, nieuwe_url);
        statusMap.set(oude_url, status_code);
    }

    // 2. Check for chains and loops
    for (const [startUrl, targetUrl] of redirectMap.entries()) {
        const visited = new Set<string>();
        visited.add(startUrl);

        let current = targetUrl;
        let chainLength = 0;

        while (redirectMap.has(current)) {
            if (visited.has(current)) {
                console.error(
                    `❌ Error: Circular redirect loop detected: ${Array.from(visited).join(' -> ')} -> ${current}`,
                );
                errors++;
                break;
            }

            visited.add(current);
            current = redirectMap.get(current)!;
            chainLength++;

            if (chainLength > 10) {
                console.error(
                    `❌ Error: Excessively long chain or cycle suspected for URL: ${startUrl}`,
                );
                errors++;
                break;
            }
        }

        if (chainLength > 0 && !visited.has(current)) {
            console.warn(
                `⚠️ Warning: Redirect chain detected: ${startUrl} -> ${targetUrl} -> ... -> ${current} (Will resolve to final destination directly, but should be simplified in mapping)`,
            );
            warnings++;
        }
    }

    // 3. Normalization checks
    for (const row of redirects) {
        const { oude_url, nieuwe_url } = row;
        if (oude_url) {
            const urlLower = oude_url.toLowerCase();
            if (oude_url !== urlLower) {
                console.warn(
                    `⚠️ Warning: Legacy URL is not lowercase: ${oude_url}`,
                );
                warnings++;
            }
            if (
                oude_url.endsWith('/') &&
                oude_url !== 'https://www.emlinked.nl/'
            ) {
                console.warn(
                    `⚠️ Warning: Legacy URL has a trailing slash (recommend stripping): ${oude_url}`,
                );
                warnings++;
            }
        }
        if (nieuwe_url) {
            const urlLower = nieuwe_url.toLowerCase();
            if (nieuwe_url !== urlLower) {
                console.warn(
                    `⚠️ Warning: Target URL is not lowercase: ${nieuwe_url}`,
                );
                warnings++;
            }
            if (
                nieuwe_url.endsWith('/') &&
                nieuwe_url !== 'https://www.emlinked.com/'
            ) {
                console.warn(
                    `⚠️ Warning: Target URL has a trailing slash (recommend stripping): ${nieuwe_url}`,
                );
                warnings++;
            }
        }
    }

    console.log(`\n📋 Audit Summary:`);
    console.log(`   - Errors: ${errors}`);
    console.log(`   - Warnings: ${warnings}`);

    if (errors > 0) {
        console.error(
            `\n❌ Validation Failed: ${errors} errors found. Resolve errors before deployment.`,
        );
        process.exit(1);
    } else {
        // Compile JSON map
        const jsonMap: Record<string, { destination: string; status: number }> =
            {};
        for (const row of redirects) {
            const { oude_url, nieuwe_url, status_code, beslissing } = row;
            if (!oude_url) continue;

            const status = parseInt(status_code, 10) || 301;

            if (beslissing === 'vervallen') {
                jsonMap[oude_url] = { destination: '', status: 410 };
                try {
                    const pathName = new URL(oude_url).pathname.toLowerCase();
                    jsonMap[pathName] = { destination: '', status: 410 };
                } catch {}
            } else if (nieuwe_url) {
                jsonMap[oude_url] = { destination: nieuwe_url, status };
                try {
                    const pathName = new URL(oude_url).pathname.toLowerCase();
                    jsonMap[pathName] = { destination: nieuwe_url, status };
                    // Strip trailing slash if present for robustness
                    if (pathName.endsWith('/') && pathName !== '/') {
                        jsonMap[pathName.slice(0, -1)] = {
                            destination: nieuwe_url,
                            status,
                        };
                    }
                } catch {}
            }
        }

        const outputPath = path.resolve(process.cwd(), 'src/redirects.json');
        fs.writeFileSync(outputPath, JSON.stringify(jsonMap, null, 2));
        console.log(`\n🎉 Compiled redirect mapping output to ${outputPath}`);
        console.log(`✅ Validation Passed: No critical redirect issues found.`);
    }
}

validateRedirects();
