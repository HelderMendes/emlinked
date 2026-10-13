import { NextResponse } from 'next/server';
import {
    createQuoteContactSchema,
    flattenQuoteContactErrors,
} from '@/lib/validation/quote';
import { EMLINKED_LOGO_DATA_URI } from '@/lib/emailAssets';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { sanityClient } from '@/lib/sanity';

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
            oneTimeItems = [],
            monthlyItems = [],
            baseMonthlyPrice = '€ 144,80',
            monthlyAdditions = '€ 0,00',
            supportFee = '€ 28,96',
            totalOneTime = '€ 0,00',
            totalMonthly = '€ 173,76',
            locale = 'nl',
            recaptchaToken,
        } = body;
        const isEn = locale === 'en';

        const recaptchaResult = await verifyRecaptcha(recaptchaToken, isEn);
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

        const { name, email, phone, company } = parsed.data;

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

        // Format item rows HTML — one-time items render in neutral gray
        // (de-emphasized), monthly items keep the teal accent, matching the
        // calculator UI's grouping.
        const renderItemRow = (item: SelectedItem, accentColor: string) => `
            <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 8px 0; color: #0f1329;">
                    <strong>${item.category}</strong>
                    ${item.label ? `<br/><span style="color: ${accentColor}; font-size: 12px;">• ${item.label}</span>` : ''}
                </td>
                <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #0f1329;">
                    ${item.priceFormatted}
                </td>
            </tr>
        `;

        const oneTimeItemsHtml = oneTimeItems
            .map((item: SelectedItem) => renderItemRow(item, '#64748b'))
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
                        <td style="padding: 4px 12px; color: #0f1329;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 4px 12px; font-weight: bold; color: #545b83;">E-mailadres:</td>
                        <td style="padding: 4px 12px; color: #0f1329;"><a href="mailto:${email}" style="color: #00b3b3; text-decoration: none;">${email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 4px 12px; font-weight: bold; color: #545b83;">Telefoon:</td>
                        <td style="padding: 4px 12px; color: #0f1329;">${phone ? `<a href="tel:${phone}" style="color: #0f1329;">${phone}</a>` : 'Niet opgegeven'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 4px 12px 8px; font-weight: bold; color: #545b83;">Bedrijf:</td>
                        <td style="padding: 4px 12px 8px; color: #0f1329;">${company || 'Niet opgegeven'}</td>
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
                    <div style="display: flex; justify-content: space-between; margin-top: 8px; padding-top: 8px; border-top: 1px solid #cbd5e1;">
                        <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #475569;">Totaal – Eenmalige Kosten</span>
                        <span style="font-size: 13px; font-weight: bold; color: #0f1329;">${totalOneTime}</span>
                    </div>
                </div>
                `
                        : ''
                }

                ${
                    monthlyItemsHtml
                        ? `
                <h3 style="color: #0f1329; font-size: 15px; margin-bottom: 10px;">Geselecteerde Onderdelen & Specificatie</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                    <thead>
                        <tr style="border-bottom: 2px solid #ccffff; text-align: left; color: #545b83; font-size: 12px; text-transform: uppercase;">
                            <th style="padding-bottom: 8px;">Onderdeel</th>
                            <th style="padding-bottom: 8px; text-align: right;">Bedrag</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${monthlyItemsHtml}
                    </tbody>
                </table>
                `
                        : ''
                }

                ${
                    monthlyItemsHtml
                        ? `
                <div style="background-color: #ffffff; color: #0f1329; padding: 16px; border-radius: 8px; margin-top: 20px; border: 1px solid #00b3b3;">
                    <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #00b3b3; margin-bottom: 10px;">Maandelijks Abonnement</div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px;">
                        <span>emlinked Basis Maand Abonnement:</span>
                        <span>${baseMonthlyPrice}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px;">
                        <span>Extra Maandelijke Diensten:</span>
                        <span>${monthlyAdditions}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 13px; color: #00b3b3; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
                        <span>Support Fee (20%):</span>
                        <span>${supportFee}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #0f1329; pt: 4px;">
                        <span>TOTAAL MAAND ABONNEMENT:</span>
                        <span>${totalMonthly} / mnd</span>
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
        const prospectSubject = monthlyItemsHtml
            ? isEn
                ? `Your emlinked Pricing Calculation - ${totalMonthly} / mo`
                : `Je emlinked Offerte Berekening - ${totalMonthly} / mnd`
            : isEn
              ? `Your emlinked Order Confirmation - ${totalOneTime}`
              : `Je emlinked Bestelbevestiging - ${totalOneTime}`;

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
                        ${isEn ? `Beste ${name}, thank you for your request.` : `Beste ${name}, bedankt voor je aanvraag.`}
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
                    <div style="display: flex; justify-content: space-between; margin-top: 8px; padding-top: 8px; border-top: 1px solid #cbd5e1;">
                        <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #475569;">
                            ${isEn ? 'Total One-time Costs' : 'Totaal – Eenmalige Kosten'}
                        </span>
                        <span style="font-size: 13px; font-weight: bold; color: #0f1329;">${totalOneTime}</span>
                    </div>
                </div>
                `
                        : ''
                }

                ${
                    monthlyItemsHtml
                        ? `
                <h3 style="color: #0f1329; font-size: 15px; margin-top: 20px; margin-bottom: 10px;">
                    ${isEn ? 'Selected Features & Summary' : 'Geselecteerde Opties & Specificatie'}
                </h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                    <thead>
                        <tr style="border-bottom: 2px solid #ccffff; text-align: left; color: #545b83; font-size: 12px; text-transform: uppercase;">
                            <th style="padding-bottom: 8px;">${isEn ? 'Feature' : 'Onderdeel'}</th>
                            <th style="padding-bottom: 8px; text-align: right;">${isEn ? 'Amount' : 'Bedrag'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${monthlyItemsHtml}
                    </tbody>
                </table>
                `
                        : ''
                }

                ${
                    monthlyItemsHtml
                        ? `
                <div style="background-color: #ffffff; color: #0f1329; padding: 20px; border-radius: 10px; margin-top: 20px; border: 1px solid #00b3b3;">
                    <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #00b3b3; margin-bottom: 12px;">
                        ${isEn ? 'Monthly Subscription' : 'Maandelijks Abonnement'}
                    </div>
                    <div style="margin-bottom: 8px; font-size: 13px; color: #1c234f;">
                        <span>${isEn ? 'Base Monthly Subscription:' : 'emlinked Basis Maand Abonnement:'}</span>
                        <span style="float: right; font-weight: bold;">${baseMonthlyPrice}</span>
                    </div>
                    <div style="margin-bottom: 8px; font-size: 13px; color: #1c234f;">
                        <span>${isEn ? 'Monthly Subscriptions – Extra Services:' : 'Maand Abonnement – Extra Diensten:'}</span>
                        <span style="float: right; font-weight: bold;">${monthlyAdditions}</span>
                    </div>
                    <div style="margin-bottom: 12px; font-size: 13px; color: #00b3b3; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">
                        <span>Support fee (20%):</span>
                        <span style="float: right; font-weight: bold;">${supportFee}</span>
                    </div>
                    <div style="font-size: 18px; font-weight: bold; color: #0f1329; padding-top: 4px;">
                        <span>${isEn ? 'TOTAL MONTHLY SUBSCRIPTION:' : 'TOTAAL MAAND ABONNEMENT:'}</span>
                        <span style="float: right;">${totalMonthly} / mnd</span>
                    </div>
                </div>
                `
                        : ''
                }

                <div style="margin-top: 32px; text-align: center;">
                    <a href="https://emlinked.com" style="display: inline-block; background-color: #0f1329; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: bold; font-size: 14px;">
                        ${isEn ? 'Visit emlinked.com' : 'Bekijk Emlinked Platform'}
                    </a>
                </div>

                <div style="margin-top: 32px; font-size: 11px; color: #545b83; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 16px;">
                    emlinked B.V. • Gooimeer 12, 1411 DE Naarden • <a href="mailto:info@emlinked.com" style="color: #545b83;">info@emlinked.com</a>
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
                    label: item.label || item.category,
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
            console.error('Sanity quoteSubmission persist error:', persistError);
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
    } catch (error: any) {
        console.error('Quote calculation submission error:', error);
        return NextResponse.json(
            { error: 'Interne serverfout bij het verzenden van de offerte.' },
            { status: 500 }
        );
    }
}
