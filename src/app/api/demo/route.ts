import { NextResponse } from 'next/server';
import { z } from 'zod';
import { EMLINKED_LOGO_DATA_URI } from '@/lib/emailAssets';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { escapeHtml, sanitizeSubjectText } from '@/lib/validation/quote';

const demoRequestSchema = z.object({
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().max(40).optional().or(z.literal('')),
    company: z.string().trim().max(150).optional().or(z.literal('')),
    portfolioSize: z.string().trim().max(120).optional().or(z.literal('')),
    message: z.string().trim().max(4000).optional().or(z.literal('')),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { recaptchaToken, action, locale = 'nl' } = body;
        const isEn = locale === 'en';

        const ALLOWED_RECAPTCHA_ACTIONS = [
            'demo_request',
            'contact_form',
            'footer_contact',
        ];
        const expectedAction = ALLOWED_RECAPTCHA_ACTIONS.includes(action)
            ? action
            : 'demo_request';
        const isDemoRequest = expectedAction === 'demo_request';

        // 1. Validate & bound input fields
        const parsed = demoRequestSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: isEn
                        ? 'Please check that your name and a valid email address are filled in.'
                        : 'Controleer of je naam en een geldig e-mailadres zijn ingevuld.',
                },
                { status: 400 }
            );
        }

        const { name, email, phone, company, portfolioSize, message } = parsed.data;

        // 2. Validate Google reCAPTCHA (v3, score-based)
        const recaptchaResult = await verifyRecaptcha(
            recaptchaToken,
            isEn,
            expectedAction,
        );
        if (!recaptchaResult.success) {
            return NextResponse.json(
                { error: recaptchaResult.error },
                { status: recaptchaResult.status },
            );
        }

        // 3. Send email via Resend API
        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            return NextResponse.json(
                {
                    error: isEn
                        ? 'Email service is currently not configured.'
                        : 'E-mail service is momenteel niet geconfigureerd.',
                },
                { status: 500 }
            );
        }

        const mailTo = process.env.MAIL_TO_EMAIL || 'info@helderdesign.nl';
        const mailFrom = process.env.MAIL_FROM_EMAIL || 'info@helderdesign.nl';
        const mailFromName = process.env.MAIL_FROM_NAME || 'emlinked';

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone);
        const safeCompany = escapeHtml(company);
        const safePortfolioSize = escapeHtml(portfolioSize);
        const safeMessage = escapeHtml(message);

        // ── 1. INTERNAL NOTIFICATION EMAIL TO ADMINISTRATION ──
        const emailHtml = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9;">
                    <img src="${EMLINKED_LOGO_DATA_URI}" alt="emlinked" width="250" style="width: 250px; height: auto; max-width: 100%; display: inline-block;" />
                </div>
                <h2 style="color: #060e32; border-bottom: 2px solid #ff9400; padding-bottom: 10px; margin-top: 0;">
                    ${isDemoRequest ? 'Nieuwe Demo Aanvraag' : 'Nieuw Contactbericht'}
                </h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 180px;">Naam:</td>
                        <td style="padding: 8px 0; color: #0f172a;">${safeName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #475569;">E-mailadres:</td>
                        <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #475569;">Telefoonnummer:</td>
                        <td style="padding: 8px 0; color: #0f172a;">${safePhone ? `<a href="tel:${safePhone}">${safePhone}</a>` : 'Niet ingevuld'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #475569;">Organisatie:</td>
                        <td style="padding: 8px 0; color: #0f172a;">${safeCompany || 'Niet ingevuld'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #475569;">Portefeuille omvang:</td>
                        <td style="padding: 8px 0; color: #0f172a;">${safePortfolioSize || 'Niet gespecificeerd'}</td>
                    </tr>
                </table>
                
                ${
                    safeMessage
                        ? `
                <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #ff9400; border-radius: 4px;">
                    <p style="margin: 0 0 8px 0; font-weight: bold; color: #475569;">Bericht:</p>
                    <p style="margin: 0; color: #0f172a; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${safeMessage}</p>
                </div>
                `
                        : ''
                }
                
                <div style="margin-top: 30px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                    Deze e-mail is automatisch verzonden vanaf emlinked.com.
                </div>
            </div>
        `;

        // ── 2. CONFIRMATION EMAIL TO VISITOR / PROSPECT ──
        const prospectSubject = isDemoRequest
            ? isEn
                ? 'Confirmation of your emlinked demo request'
                : 'Bevestiging van je emlinked demo-aanvraag'
            : isEn
              ? 'We have received your message – emlinked'
              : 'We hebben je bericht ontvangen – emlinked';

        const prospectTitle = isDemoRequest
            ? isEn
                ? 'Your Demo Request is Received'
                : 'Je Demo-aanvraag is Ontvangen'
            : isEn
              ? 'Thank You for Your Message'
              : 'Bedankt voor je Bericht';

        const prospectIntro = isDemoRequest
            ? isEn
                ? 'Thank you for your interest in emlinked. Below is a summary of your demo request.'
                : 'Bedankt voor je interesse in emlinked. Hieronder vind je een overzicht van je demo-aanvraag.'
            : isEn
              ? 'Thank you for reaching out to emlinked. Below is a copy of the details you submitted.'
              : 'Bedankt voor je bericht aan emlinked. Hieronder vind je een kopie van je ingevulde gegevens.';

        const prospectEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9;">
                    <img src="${EMLINKED_LOGO_DATA_URI}" alt="emlinked" width="250" style="width: 250px; height: auto; max-width: 100%; display: inline-block;" />
                </div>
                <div style="text-align: center; border-bottom: 2px solid #ff9400; padding-bottom: 16px; margin-bottom: 20px;">
                    <h2 style="color: #060e32; margin: 0; font-size: 22px;">
                        ${prospectTitle}
                    </h2>
                    <p style="color: #475569; font-size: 14px; margin: 6px 0 0 0;">
                        ${isEn ? `Dear ${safeName}, thank you for your request.` : `Beste ${safeName}, bedankt voor je aanvraag.`}
                    </p>
                </div>

                <p style="color: #1e293b; font-size: 14px; line-height: 1.6; margin-top: 0;">
                    ${prospectIntro}
                </p>

                <div style="background-color: #fff7ed; border: 1px solid #fed7aa; border-left: 4px solid #ff9400; border-radius: 8px; padding: 14px 16px; margin: 18px 0;">
                    <p style="margin: 0; font-size: 13px; color: #060e32; line-height: 1.5;">
                        <strong>${isEn ? 'What happens next?' : 'Wat is de volgende stap?'}</strong><br/>
                        ${
                            isEn
                                ? 'One of our property management specialists will contact you within 1 business day to schedule your personal walkthrough or answer your questions.'
                                : 'Een van onze vastgoedbeheerspecialisten neemt binnen 1 werkdag contact met je op om een persoonlijk moment in te plannen of je vragen te beantwoorden.'
                        }
                    </p>
                </div>

                <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
                    <tr>
                        <td style="padding: 7px 0; font-weight: bold; color: #475569; width: 170px;">${isEn ? 'Name:' : 'Naam:'}</td>
                        <td style="padding: 7px 0; color: #0f172a;">${safeName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 7px 0; font-weight: bold; color: #475569;">${isEn ? 'Email:' : 'E-mailadres:'}</td>
                        <td style="padding: 7px 0; color: #0f172a;">${safeEmail}</td>
                    </tr>
                    ${
                        safePhone
                            ? `
                    <tr>
                        <td style="padding: 7px 0; font-weight: bold; color: #475569;">${isEn ? 'Phone:' : 'Telefoonnummer:'}</td>
                        <td style="padding: 7px 0; color: #0f172a;">${safePhone}</td>
                    </tr>`
                            : ''
                    }
                    ${
                        safeCompany
                            ? `
                    <tr>
                        <td style="padding: 7px 0; font-weight: bold; color: #475569;">${isEn ? 'Organization:' : 'Organisatie:'}</td>
                        <td style="padding: 7px 0; color: #0f172a;">${safeCompany}</td>
                    </tr>`
                            : ''
                    }
                    ${
                        safePortfolioSize
                            ? `
                    <tr>
                        <td style="padding: 7px 0; font-weight: bold; color: #475569;">${isEn ? 'Portfolio size:' : 'Portefeuille omvang:'}</td>
                        <td style="padding: 7px 0; color: #0f172a;">${safePortfolioSize}</td>
                    </tr>`
                            : ''
                    }
                </table>

                ${
                    safeMessage
                        ? `
                <div style="margin-top: 18px; padding: 14px; background-color: #f8fafc; border-left: 4px solid #ff9400; border-radius: 4px;">
                    <p style="margin: 0 0 6px 0; font-weight: bold; color: #475569; font-size: 13px;">${isEn ? 'Your message:' : 'Jouw bericht:'}</p>
                    <p style="margin: 0; color: #0f172a; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${safeMessage}</p>
                </div>
                `
                        : ''
                }

                <div style="margin-top: 28px; text-align: center;">
                    <a href="https://emlinked.com" style="display: inline-block; background-color: #060e32; color: #ffffff; text-decoration: none; padding: 12px 26px; border-radius: 6px; font-weight: bold; font-size: 14px;">
                        ${isEn ? 'Visit emlinked.com' : 'Bekijk emlinked.com'}
                    </a>
                </div>

                <div style="margin-top: 28px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                    emlinked B.V. • Gooimeer 12, 1411 DE Naarden • <a href="mailto:info@emlinked.com" style="color: #64748b;">info@emlinked.com</a>
                </div>
            </div>
        `;

        const subjectName = sanitizeSubjectText(name);
        const subjectCompany = sanitizeSubjectText(company) || 'Geen bedrijf';
        const adminSubjectPrefix = isDemoRequest
            ? 'Demo Aanvraag'
            : 'Contactbericht';

        // Send Email 1 (to Administration)
        const resendRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resendApiKey}`
            },
            body: JSON.stringify({
                from: `${mailFromName} <${mailFrom}>`,
                to: mailTo,
                reply_to: email,
                subject: `${adminSubjectPrefix}: ${subjectName} (${subjectCompany})`,
                html: emailHtml
            })
        });

        const resendJson = await resendRes.json();

        if (!resendRes.ok) {
            console.error('Resend API error:', resendJson);
            return NextResponse.json(
                {
                    error: isEn
                        ? 'Error sending the request email.'
                        : 'Fout bij het verzenden van de aanvraag e-mail.',
                },
                { status: resendRes.status }
            );
        }

        // Send Email 2 (Confirmation to Visitor / Prospect)
        try {
            const resendProspectRes = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${resendApiKey}`
                },
                body: JSON.stringify({
                    from: `${mailFromName} <${mailFrom}>`,
                    to: email,
                    reply_to: mailTo,
                    subject: prospectSubject,
                    html: prospectEmailHtml
                })
            });

            if (!resendProspectRes.ok) {
                const errJson = await resendProspectRes.json();
                console.error('Resend Prospect Confirmation error:', errJson);
            }
        } catch (prospectError) {
            console.error('Demo prospect confirmation email error:', prospectError);
        }

        return NextResponse.json({ success: true, id: resendJson.id });
    } catch (error) {
        console.error('Demo request API error:', error);
        return NextResponse.json(
            { error: 'Interne server fout.' },
            { status: 500 }
        );
    }
}
