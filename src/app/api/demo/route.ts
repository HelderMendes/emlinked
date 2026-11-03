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
        const { recaptchaToken, action } = body;

        const ALLOWED_RECAPTCHA_ACTIONS = [
            'demo_request',
            'contact_form',
            'footer_contact',
        ];
        const expectedAction = ALLOWED_RECAPTCHA_ACTIONS.includes(action)
            ? action
            : 'demo_request';

        // 1. Validate & bound input fields
        const parsed = demoRequestSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Controleer of je naam en een geldig e-mailadres zijn ingevuld.' },
                { status: 400 }
            );
        }

        const { name, email, phone, company, portfolioSize, message } = parsed.data;

        // 2. Validate Google reCAPTCHA (v3, score-based)
        const recaptchaResult = await verifyRecaptcha(
            recaptchaToken,
            false,
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
                { error: 'E-mail service is momenteel niet geconfigureerd.' },
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

        const emailHtml = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9;">
                    <img src="${EMLINKED_LOGO_DATA_URI}" alt="emlinked" width="250" style="width: 250px; height: auto; max-width: 100%; display: inline-block;" />
                </div>
                <h2 style="color: #060e32; border-bottom: 2px solid #ff9400; padding-bottom: 10px; margin-top: 0;">
                    Nieuwe Demo Aanvraag
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
                    Deze e-mail is automatisch verzonden vanaf het demo formulier op emlinked.com.
                </div>
            </div>
        `;

        const subjectName = sanitizeSubjectText(name);
        const subjectCompany = sanitizeSubjectText(company) || 'Geen bedrijf';

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
                subject: `Demo Aanvraag: ${subjectName} (${subjectCompany})`,
                html: emailHtml
            })
        });

        const resendJson = await resendRes.json();

        if (!resendRes.ok) {
            console.error('Resend API error:', resendJson);
            return NextResponse.json(
                { error: 'Fout bij het verzenden van de demo e-mail.' },
                { status: resendRes.status }
            );
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
