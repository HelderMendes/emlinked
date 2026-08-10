import { NextResponse } from 'next/server';

interface SelectedItem {
    category: string;
    label?: string;
    priceFormatted: string;
    isNaBerekening?: boolean;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            phone,
            company,
            selectedItems = [],
            baseMonthlyPrice = '€ 144,80',
            monthlyAdditions = '€ 0,00',
            supportFee = '€ 28,96',
            totalOneTime = '€ 0,00',
            totalMonthly = '€ 173,76',
            locale = 'nl',
        } = body;

        // Basic validation
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Naam en e-mailadres zijn verplicht.' },
                { status: 400 }
            );
        }

        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            console.warn('RESEND_API_KEY not found in environment.');
            return NextResponse.json(
                { error: 'E-mail service is momenteel niet geconfigureerd.' },
                { status: 500 }
            );
        }

        const adminEmail = process.env.MAIL_TO_EMAIL || 'info@helderdesign.nl';
        const mailFrom = process.env.MAIL_FROM_EMAIL || 'info@helderdesign.nl';
        const mailFromName = process.env.MAIL_FROM_NAME || 'emlinked';

        // Format selected items rows HTML
        const itemsHtml = selectedItems
            .map(
                (item: SelectedItem) => `
            <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #0f172a;">
                    <strong>${item.category}</strong>
                    ${item.label ? `<br/><span style="color: #ea580c; font-size: 12px;">• ${item.label}</span>` : ''}
                </td>
                <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #0f172a;">
                    ${item.priceFormatted}
                </td>
            </tr>
        `
            )
            .join('');

        // ── 1. EMAIL TO ADMINISTRATION ──
        const adminEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
                <div style="border-bottom: 3px solid #ff9400; padding-bottom: 12px; margin-bottom: 20px;">
                    <h2 style="color: #060e32; margin: 0; font-size: 22px;">⚡ Nieuwe Offerte Berekening Ontvangen</h2>
                    <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Aanvraag via de emlinked prijzen calculator</p>
                </div>

                <h3 style="color: #060e32; font-size: 15px; margin-bottom: 10px;">Contactgegevens Prospect</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #f8fafc; border-radius: 8px; padding: 12px;">
                    <tr>
                        <td style="padding: 8px 12px; font-weight: bold; color: #475569; width: 140px;">Naam:</td>
                        <td style="padding: 8px 12px; color: #0f172a;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 12px; font-weight: bold; color: #475569;">E-mailadres:</td>
                        <td style="padding: 8px 12px; color: #0f172a;"><a href="mailto:${email}" style="color: #ea580c; text-decoration: none;">${email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 12px; font-weight: bold; color: #475569;">Telefoon:</td>
                        <td style="padding: 8px 12px; color: #0f172a;">${phone ? `<a href="tel:${phone}" style="color: #0f172a;">${phone}</a>` : 'Niet opgegeven'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 12px; font-weight: bold; color: #475569;">Bedrijf:</td>
                        <td style="padding: 8px 12px; color: #0f172a;">${company || 'Niet opgegeven'}</td>
                    </tr>
                </table>

                <h3 style="color: #060e32; font-size: 15px; margin-bottom: 10px;">Geselecteerde Onderdelen & Specificatie</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                    <thead>
                        <tr style="border-bottom: 2px solid #cbd5e1; text-align: left; color: #475569; font-size: 12px; text-transform: uppercase;">
                            <th style="padding-bottom: 8px;">Onderdeel</th>
                            <th style="padding-bottom: 8px; text-align: right;">Bedrag</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>

                <div style="background-color: #060e32; color: #ffffff; padding: 16px; border-radius: 8px; margin-top: 20px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px;">
                        <span>emlinked Basis Maand Abonnement:</span>
                        <span>${baseMonthlyPrice}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px;">
                        <span>Extra Maandelijke Diensten:</span>
                        <span>${monthlyAdditions}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px; color: #fbbf24;">
                        <span>Support Fee (20%):</span>
                        <span>${supportFee}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 13px; color: #fbbf24; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 8px;">
                        <span>Totaal Eenmalige Diensten:</span>
                        <span>${totalOneTime}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #ff9400; pt: 4px;">
                        <span>TOTAAL MAAND ABONNEMENT:</span>
                        <span>${totalMonthly} / mnd</span>
                    </div>
                </div>

                <div style="margin-top: 24px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 12px;">
                    Automatisch verzonden vanuit het offerteformulier op emlinked.com
                </div>
            </div>
        `;

        // ── 2. CONFIRMATION EMAIL TO PROSPECT ──
        const isEn = locale === 'en';
        const prospectSubject = isEn
            ? `Your emlinked Pricing Calculation - ${totalMonthly} / mo`
            : `Je emlinked Offerte Berekening - ${totalMonthly} / mnd`;

        const prospectEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
                <div style="text-align: center; border-bottom: 3px solid #ff9400; padding-bottom: 16px; margin-bottom: 24px;">
                    <h2 style="color: #060e32; margin: 0; font-size: 24px;">
                        ${isEn ? 'Your Personal emlinked Quote' : 'Je Persoonlijke emlinked Offerte'}
                    </h2>
                    <p style="color: #64748b; font-size: 14px; margin: 6px 0 0 0;">
                        ${isEn ? `Beste ${name}, thank you for your request.` : `Beste ${name}, bedankt voor je aanvraag.`}
                    </p>
                </div>

                <p style="color: #334155; font-size: 14px; line-height: 1.6;">
                    ${
                        isEn
                            ? 'Here is your customized pricing calculation based on your selected requirements. One of our specialists will be in touch within 1 business day to answer any questions.'
                            : 'Hierbij ontvang je het overzicht van jouw samengestelde emlinked abonnement. Een van onze vastgoedbeheerspecialisten neemt binnen 1 werkdag contact op voor eventuele toelichting.'
                    }
                </p>

                <h3 style="color: #060e32; font-size: 15px; margin-top: 20px; margin-bottom: 10px;">
                    ${isEn ? 'Selected Features & Summary' : 'Geselecteerde Opties & Specificatie'}
                </h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                    <thead>
                        <tr style="border-bottom: 2px solid #cbd5e1; text-align: left; color: #475569; font-size: 12px; text-transform: uppercase;">
                            <th style="padding-bottom: 8px;">${isEn ? 'Feature' : 'Onderdeel'}</th>
                            <th style="padding-bottom: 8px; text-align: right;">${isEn ? 'Amount' : 'Bedrag'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>

                <div style="background-color: #060e32; color: #ffffff; padding: 20px; border-radius: 10px; margin-top: 20px;">
                    <div style="margin-bottom: 8px; font-size: 13px; color: #e2e8f0;">
                        <span>${isEn ? 'Base Monthly Subscription:' : 'emlinked Basis Maand Abonnement:'}</span>
                        <span style="float: right; font-weight: bold;">${baseMonthlyPrice}</span>
                    </div>
                    <div style="margin-bottom: 8px; font-size: 13px; color: #e2e8f0;">
                        <span>${isEn ? 'Monthly Subscriptions – Extra Services:' : 'Maand Abonnement – Extra Diensten:'}</span>
                        <span style="float: right; font-weight: bold;">${monthlyAdditions}</span>
                    </div>
                    <div style="margin-bottom: 8px; font-size: 13px; color: #fbbf24;">
                        <span>Support fee (20%):</span>
                        <span style="float: right; font-weight: bold;">${supportFee}</span>
                    </div>
                    <div style="margin-bottom: 12px; font-size: 13px; color: #fbbf24; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 10px;">
                        <span>${isEn ? 'Total One-time Setup Services:' : 'Totaal Eenmalige Extra Diensten:'}</span>
                        <span style="float: right; font-weight: bold;">${totalOneTime}</span>
                    </div>
                    <div style="font-size: 18px; font-weight: bold; color: #ff9400; padding-top: 4px;">
                        <span>${isEn ? 'TOTAL MONTHLY SUBSCRIPTION:' : 'TOTAAL MAAND ABONNEMENT:'}</span>
                        <span style="float: right;">${totalMonthly} / mnd</span>
                    </div>
                </div>

                <div style="margin-top: 32px; text-align: center;">
                    <a href="https://emlinked.com" style="display: inline-block; background-color: #ff9400; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: bold; font-size: 14px;">
                        ${isEn ? 'Visit emlinked.com' : 'Bekijk Emlinked Platform'}
                    </a>
                </div>

                <div style="margin-top: 32px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px;">
                    emlinked B.V. • Gooimeer 12, 1411 DE Naarden • <a href="mailto:info@emlinked.com" style="color: #64748b;">info@emlinked.com</a>
                </div>
            </div>
        `;

        // Send Email 1 (to Admin)
        const resendAdminRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
                from: `${mailFromName} Calculator <${mailFrom}>`,
                to: adminEmail,
                subject: `Nieuwe Offerte Berekening: ${company || name}`,
                html: adminEmailHtml,
            }),
        });

        if (!resendAdminRes.ok) {
            const errJson = await resendAdminRes.json();
            console.error('Resend Admin Email error:', errJson);
        }

        // Send Email 2 (to Prospect)
        const resendProspectRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
                from: `${mailFromName} <${mailFrom}>`,
                to: email,
                subject: prospectSubject,
                html: prospectEmailHtml,
            }),
        });

        if (!resendProspectRes.ok) {
            const errJson = await resendProspectRes.json();
            console.error('Resend Prospect Email error:', errJson);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Quote calculation submission error:', error);
        return NextResponse.json(
            { error: 'Interne serverfout bij het verzenden van de offerte.' },
            { status: 500 }
        );
    }
}
