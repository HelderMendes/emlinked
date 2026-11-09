import { NextResponse } from 'next/server';
import {
    createQuoteContactSchema,
    escapeHtml,
    flattenQuoteContactErrors,
    quoteCalculationPayloadSchema,
    sanitizeSubjectText,
} from '@/lib/validation/quote';
import { EMLINKED_LOGO_DATA_URI } from '@/lib/emailAssets';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { sanityClient } from '@/lib/sanity';

interface SelectedItemLabel {
    label: string;
    priceFormatted?: string;
}

interface SelectedItem {
    category: string;
    label?: string;
    labels?: SelectedItemLabel[];
    priceFormatted: string;
    isNaBerekening?: boolean;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { locale = 'nl', recaptchaToken } = body;
        const isEn = locale === 'en';

        const recaptchaResult = await verifyRecaptcha(
            recaptchaToken,
            isEn,
            'quote_request',
        );
        if (!recaptchaResult.success) {
            return NextResponse.json(
                { error: recaptchaResult.error },
                { status: recaptchaResult.status },
            );
        }

        // Authoritative server-side validation — the client checks the same
        // schema for instant feedback, but that can always be bypassed, so
        // this is the check that actually gates sending an email.
        const contactSchema = createQuoteContactSchema(isEn);
        const parsed = contactSchema.safeParse({
            name: body.name,
            email: body.email,
            phone: body.phone,
            company: body.company,
        });

        if (!parsed.success) {
            const fieldErrors = flattenQuoteContactErrors(parsed.error);
            const firstMessage = parsed.error.issues[0]?.message;
            return NextResponse.json(
                {
                    error:
                        firstMessage ||
                        (isEn
                            ? 'Please check the highlighted fields.'
                            : 'Controleer de gemarkeerde velden.'),
                    fieldErrors,
                },
                { status: 400 },
            );
        }

        const calcParsed = quoteCalculationPayloadSchema.safeParse(body);
        if (!calcParsed.success) {
            return NextResponse.json(
                {
                    error: isEn
                        ? 'Invalid calculation payload.'
                        : 'Ongeldige offerteberekening.',
                },
                { status: 400 },
            );
        }

        const { name, email, phone, company } = parsed.data;
        const {
            oneTimeItems,
            monthlyItems,
            baseMonthlyPrice,
            monthlyAdditions,
            supportFee,
            totalOneTime,
            totalMonthly,
        } = calcParsed.data;

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone);
        const safeCompany = escapeHtml(company);
        const safeBaseMonthlyPrice = escapeHtml(baseMonthlyPrice);
        const safeMonthlyAdditions = escapeHtml(monthlyAdditions);
        const safeSupportFee = escapeHtml(supportFee);
        const safeTotalOneTime = escapeHtml(totalOneTime);
        const safeTotalMonthly = escapeHtml(totalMonthly);

        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            console.warn('RESEND_API_KEY not found in environment.');
            return NextResponse.json(
                { error: 'E-mail service is momenteel niet geconfigureerd.' },
                { status: 500 },
            );
        }

        const adminEmail = process.env.MAIL_TO_EMAIL || 'info@helderdesign.nl';
        const mailFrom = process.env.MAIL_FROM_EMAIL || 'info@helderdesign.nl';
        const mailFromName = process.env.MAIL_FROM_NAME || 'emlinked';

        // Format item rows HTML — monthly items keep the teal accent,
        // matching the calculator UI's grouping. One-time items break out
        // into one row per label when each label has its own fixed price
        // (Strippenkaarten, Opstartkosten), instead of one combined-price
        // row per category — otherwise that row's price duplicates the
        // "Totaal – Eenmalige Kosten" line directly below it.
        const renderItemRow = (item: SelectedItem, accentColor: string) => {
            const subLines =
                item.labels && item.labels.length > 0
                    ? item.labels.map((l) => l.label)
                    : item.label
                      ? [item.label]
                      : [];
            const subLinesHtml = subLines
                .map(
                    (label) =>
                        `<br/><span style="color: ${accentColor}; font-size: 12px;">• ${escapeHtml(label)}</span>`,
                )
                .join('');
            return `
            <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 8px 0; color: #0f1329;">
                    <strong>${escapeHtml(item.category)}</strong>
                    ${subLinesHtml}
                </td>
                <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #0f1329;">
                    ${escapeHtml(item.priceFormatted)}
                </td>
            </tr>
        `;
        };

        const renderOneTimeRow = (item: SelectedItem) => {
            const hasPricedLabels = Boolean(
                item.labels?.length &&
                    item.labels.every((l) => l.priceFormatted),
            );

            if (hasPricedLabels && item.labels) {
                const labelRows = item.labels
                    .map(
                        (l) => `
            <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 4px 0 4px 12px; color: #64748b; font-size: 12px;">
                    • ${escapeHtml(l.label)}
                </td>
                <td style="padding: 4px 0; text-align: right; color: #0f1329; font-size: 12px;">
                    ${escapeHtml(l.priceFormatted || '')}
                </td>
            </tr>`,
                    )
                    .join('');
                return `
            <tr>
                <td colspan="2" style="padding: 8px 0 2px; color: #0f1329;">
                    <strong>${escapeHtml(item.category)}</strong>
                </td>
            </tr>
            ${labelRows}
        `;
            }

            return renderItemRow(item, '#64748b');
        };

        const oneTimeItemsHtml = oneTimeItems
            .map((item: SelectedItem) => renderOneTimeRow(item))
            .join('');
        const monthlyItemsHtml = monthlyItems
            .map((item: SelectedItem) => renderItemRow(item, '#00b3b3'))
            .join('');

        // ── 1. EMAIL TO ADMINISTRATION ──
        const adminEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #ccffff; border-radius: 12px; background-color: #fbfaf9;">
                <div style="text-align: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb;">
                    <img src="${EMLINKED_LOGO_DATA_URI}" alt="emlinked" width="250" style="width: 250px; height: auto; max-width: 100%; display: inline-block;" />
                </div>
                <div style="border-bottom: 3px solid #00b3b3; padding-bottom: 12px; margin-bottom: 20px;">
                    <h2 style="color: #0f1329; margin: 0; font-size: 22px;">⚡ Nieuwe Offerte Berekening Ontvangen</h2>
                    <p style="color: #545b83; font-size: 13px; margin: 4px 0 0 0;">Aanvraag via de emlinked prijzen calculator</p>
                </div>

                <h3 style="color: #0f1329; font-size: 15px; margin-bottom: 10px;">Contactgegevens Prospect</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px;">
                    <tr>
                        <td style="padding: 4px 12px; font-weight: bold; color: #545b83; width: 140px;">Naam:</td>
                        <td style="padding: 4px 12px; color: #0f1329;">${safeName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 4px 12px; font-weight: bold; color: #545b83;">E-mailadres:</td>
                        <td style="padding: 4px 12px; color: #0f1329;"><a href="mailto:${safeEmail}" style="color: #00b3b3; text-decoration: none;">${safeEmail}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 4px 12px; font-weight: bold; color: #545b83;">Telefoon:</td>
                        <td style="padding: 4px 12px; color: #0f1329;">${safePhone ? `<a href="tel:${safePhone}" style="color: #0f1329;">${safePhone}</a>` : 'Niet opgegeven'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 4px 12px 8px; font-weight: bold; color: #545b83;">Bedrijf:</td>
                        <td style="padding: 4px 12px 8px; color: #0f1329;">${safeCompany || 'Niet opgegeven'}</td>
                    </tr>
                </table>

                ${
                    oneTimeItemsHtml
                        ? `
                <div style="background-color: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; margin-bottom: 20px;">
                    <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px;">Eenmalige Kosten</div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                        <tbody>
                            ${oneTimeItemsHtml}
                        </tbody>
                    </table>
                    <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                        <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #475569;">Totaal – Eenmalige Kosten</span>
                        <span style="font-size: 13px; font-weight: bold; color: #0f1329;">${safeTotalOneTime}</span>
                    </div>
                </div>
                `
                        : ''
                }

                ${
                    monthlyItemsHtml
                        ? `
                <div style="background-color: #ffffff; color: #0f1329; padding: 16px; border-radius: 8px; margin-top: 20px; border: 1px solid #00b3b3;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #00b3b3;">Maandelijks Abonnement</span>
                        <span style="font-size: 11px; font-weight: bold; color: #00b3b3;">${safeBaseMonthlyPrice}</span>
                    </div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 10px;">
                        <tbody>
                            ${monthlyItemsHtml}
                        </tbody>
                    </table>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px;">
                        <span>emlinked Basis Maand Abonnement:</span>
                        <span>${safeBaseMonthlyPrice}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px;">
                        <span>Extra Maandelijke Diensten:</span>
                        <span>${safeMonthlyAdditions}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 13px; color: #00b3b3; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
                        <span>Support Fee (20%):</span>
                        <span>${safeSupportFee}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-top: 10px;">
                        <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #00b3b3;">Totaal &ndash; Maand Abonnement</span>
                        <span style="font-size: 20px; font-weight: bold; color: #0f1329;">${safeTotalMonthly} <span style="font-size: 12px; font-weight: normal; color: #545b83;">/ mnd</span></span>
                    </div>
                </div>
                `
                        : ''
                }

                <div style="margin-top: 24px; font-size: 11px; color: #545b83; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 12px;">
                    Automatisch verzonden vanuit het offerteformulier op emlinked.com
                </div>
            </div>
        `;

        // ── 2. CONFIRMATION EMAIL TO PROSPECT ──
        const subjectMonthly = sanitizeSubjectText(totalMonthly);
        const subjectOneTime = sanitizeSubjectText(totalOneTime);
        const prospectSubject = monthlyItemsHtml
            ? isEn
                ? `Your emlinked Pricing Calculation - ${subjectMonthly} / mo`
                : `Je emlinked Offerte Berekening - ${subjectMonthly} / mnd`
            : isEn
              ? `Your emlinked Order Confirmation - ${subjectOneTime}`
              : `Je emlinked Bestelbevestiging - ${subjectOneTime}`;

        const prospectEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #ccffff; border-radius: 12px; background-color: #fbfaf9;">
                <div style="text-align: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb;">
                    <img src="${EMLINKED_LOGO_DATA_URI}" alt="emlinked" width="250" style="width: 250px; height: auto; max-width: 100%; display: inline-block;" />
                </div>
                <div style="text-align: center; border-bottom: 3px solid #00b3b3; padding-bottom: 16px; margin-bottom: 24px;">
                    <h2 style="color: #0f1329; margin: 0; font-size: 24px;">
                        ${isEn ? 'Your Personal emlinked Quote' : 'Je Persoonlijke emlinked Offerte'}
                    </h2>
                    <p style="color: #545b83; font-size: 14px; margin: 6px 0 0 0;">
                        ${isEn ? `Dear ${safeName}, thank you for your request.` : `Beste ${safeName}, bedankt voor je aanvraag.`}
                    </p>
                </div>

                <p style="color: #1c234f; font-size: 14px; line-height: 1.6;">
                    ${
                        isEn
                            ? 'Here is your customized pricing calculation based on your selected requirements.'
                            : 'Hierbij ontvang je het overzicht van jouw samengestelde emlinked abonnement.'
                    }
                </p>

                <div style="display: flex; align-items: center; gap: 10px; background-color: #e6fffe; border: 1px solid #00b3b3; border-radius: 8px; padding: 14px 16px; margin: 16px 0;">
                    <span style="font-size: 18px; line-height: 1;">📞</span>
                    <p style="margin: 0; font-size: 13px; color: #0f1329; line-height: 1.5;">
                        <strong>${isEn ? 'We will contact you shortly.' : 'We nemen spoedig contact met je op.'}</strong><br/>
                        ${
                            isEn
                                ? 'One of our specialists will reach out within 1 business day to discuss your quote and answer any questions.'
                                : 'Een van onze vastgoedbeheerspecialisten neemt binnen 1 werkdag contact met je op om je offerte te bespreken en eventuele vragen te beantwoorden.'
                        }
                    </p>
                </div>

                ${
                    oneTimeItemsHtml
                        ? `
                <div style="background-color: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; margin: 16px 0;">
                    <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px;">
                        ${isEn ? 'One-time Costs' : 'Eenmalige Kosten'}
                    </div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                        <tbody>
                            ${oneTimeItemsHtml}
                        </tbody>
                    </table>
                    <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                        <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #475569;">
                            ${isEn ? 'Total One-time Costs' : 'Totaal – Eenmalige Kosten'}
                        </span>
                        <span style="font-size: 13px; font-weight: bold; color: #0f1329;">${safeTotalOneTime}</span>
                    </div>
                </div>
                `
                        : ''
                }

                ${
                    monthlyItemsHtml
                        ? `
                <div style="background-color: #ffffff; color: #0f1329; padding: 20px; border-radius: 10px; margin-top: 20px; border: 1px solid #00b3b3;">
                    <div style="margin-bottom: 12px; overflow: hidden;">
                        <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #00b3b3;">
                            ${isEn ? 'Monthly Subscription' : 'Maandelijks Abonnement'}
                        </span>
                        <span style="float: right; font-size: 11px; font-weight: bold; color: #00b3b3;">${safeBaseMonthlyPrice}</span>
                    </div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 10px;">
                        <tbody>
                            ${monthlyItemsHtml}
                        </tbody>
                    </table>
                    <div style="margin-bottom: 8px; font-size: 13px; color: #1c234f; overflow: hidden;">
                        <span>${isEn ? 'Base Monthly Subscription:' : 'emlinked Basis Maand Abonnement:'}</span>
                        <span style="float: right; font-weight: bold;">${safeBaseMonthlyPrice}</span>
                    </div>
                    <div style="margin-bottom: 8px; font-size: 13px; color: #1c234f; overflow: hidden;">
                        <span>${isEn ? 'Monthly Subscriptions – Extra Services:' : 'Maand Abonnement – Extra Diensten:'}</span>
                        <span style="float: right; font-weight: bold;">${safeMonthlyAdditions}</span>
                    </div>
                    <div style="margin-bottom: 12px; font-size: 13px; color: #00b3b3; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; overflow: hidden;">
                        <span>Support fee (20%):</span>
                        <span style="float: right; font-weight: bold;">${safeSupportFee}</span>
                    </div>
                    <div style="padding-top: 10px; overflow: hidden;">
                        <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #00b3b3;">${isEn ? 'Total – Monthly Subscription' : 'Totaal – Maand Abonnement'}</span>
                        <span style="float: right; font-size: 20px; font-weight: bold; color: #0f1329;">${safeTotalMonthly} <span style="font-size: 12px; font-weight: normal; color: #545b83;">/ mnd</span></span>
                    </div>
                </div>
                `
                        : ''
                }

                <div style="margin-top: 32px; text-align: center;">
                    <a href="https://emlinked.com" style="display: inline-block; background-color: #0f1329; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: bold; font-size: 14px;">
                        ${isEn ? 'Visit emlinked.com' : 'Bekijk emlinked Platform'}
                    </a>
                </div>

                <div style="margin-top: 32px; font-size: 11px; color: #545b83; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 16px;">
                    emlinked B.V. • Gooimeer 12, 1411 DE Naarden • <a href="mailto:info@emlinked.com" style="color: #545b83;">info@emlinked.com</a>
                </div>
            </div>
        `;

        // Send Email 1 (to Admin)
        const adminSubjectTarget = sanitizeSubjectText(company || name);
        const resendAdminRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
                from: `${mailFromName} Calculator <${mailFrom}>`,
                to: adminEmail,
                reply_to: email,
                subject: `Nieuwe Offerte Berekening: ${adminSubjectTarget}`,
                html: adminEmailHtml,
            }),
        });

        let adminEmailFailed = false;
        if (!resendAdminRes.ok) {
            const errJson = await resendAdminRes.json();
            console.error('Resend Admin Email error:', errJson);
            adminEmailFailed = true;
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
                reply_to: adminEmail,
                subject: prospectSubject,
                html: prospectEmailHtml,
            }),
        });

        let prospectEmailFailed = false;
        if (!resendProspectRes.ok) {
            const errJson = await resendProspectRes.json();
            console.error('Resend Prospect Email error:', errJson);
            prospectEmailFailed = true;
        }

        // Persist a record of the submission regardless of email outcome —
        // so a lead is never lost to a Resend/deliverability failure. Best
        // effort: a Sanity write error must not break the response to the
        // user, who already has a valid/invalid email result to see.
        try {
            await sanityClient.create({
                _type: 'quoteSubmission',
                name,
                email,
                phone,
                company,
                locale,
                oneTimeItems: (oneTimeItems as SelectedItem[]).map((item) => ({
                    _type: 'object',
                    label:
                        item.labels?.map((l) => l.label).join(', ') ||
                        item.label ||
                        item.category,
                    amount: item.priceFormatted,
                })),
                monthlyItems: (monthlyItems as SelectedItem[]).map((item) => ({
                    _type: 'object',
                    label: item.label || item.category,
                    amount: item.priceFormatted,
                })),
                baseMonthlyPrice,
                monthlyAdditions,
                supportFee,
                totalOneTime,
                totalMonthly,
                emailStatus:
                    adminEmailFailed || prospectEmailFailed ? 'failed' : 'sent',
                submittedAt: new Date().toISOString(),
            });
        } catch (persistError) {
            console.error(
                'Sanity quoteSubmission persist error:',
                persistError,
            );
        }

        // Surface send failures instead of silently reporting success —
        // the prospect's own confirmation email is user-facing, so if it
        // failed to send we can't honestly tell them we succeeded. A failed
        // admin notification alone still means the lead was never flagged
        // to the business, so that also counts as an overall failure.
        if (adminEmailFailed || prospectEmailFailed) {
            return NextResponse.json(
                {
                    error: isEn
                        ? 'Your quote was processed, but the confirmation email could not be sent. Please try again or contact us directly.'
                        : 'Je offerte is verwerkt, maar de bevestigingsmail kon niet worden verzonden. Probeer het opnieuw of neem direct contact met ons op.',
                },
                { status: 502 },
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Quote calculation submission error:', error);
        return NextResponse.json(
            { error: 'Interne serverfout bij het verzenden van de offerte.' },
            { status: 500 },
        );
    }
}
