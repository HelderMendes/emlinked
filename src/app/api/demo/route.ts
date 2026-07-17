import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, company, portfolioSize, message, recaptchaToken } = body;

        // 1. Basic validation
        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: 'Naam, e-mail en telefoonnummer zijn verplicht.' },
                { status: 400 }
            );
        }

        // 2. Validate Google reCAPTCHA if secret key is present
        const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
        if (recaptchaSecret) {
            if (!recaptchaToken) {
                return NextResponse.json(
                    { error: 'reCAPTCHA verificatie mislukt (geen token).' },
                    { status: 400 }
                );
            }

            try {
                const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;
                const verifyRes = await fetch(verifyUrl, { method: 'POST' });
                const verifyJson = await verifyRes.json();
                
                if (!verifyJson.success) {
                    return NextResponse.json(
                        { error: 'reCAPTCHA verificatie mislukt. Probeer het opnieuw.' },
                        { status: 400 }
                    );
                }
            } catch (err) {
                console.error('reCAPTCHA siteverify error:', err);
                return NextResponse.json(
                    { error: 'Fout bij reCAPTCHA verificatie.' },
                    { status: 500 }
                );
            }
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
        const mailFromName = process.env.MAIL_FROM_NAME || 'Emlinked';

        const emailHtml = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h2 style="color: #060e32; border-bottom: 2px solid #ff9400; padding-bottom: 10px; margin-top: 0;">
                    Nieuwe Demo Aanvraag
                </h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 180px;">Naam:</td>
                        <td style="padding: 8px 0; color: #0f172a;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #475569;">E-mailadres:</td>
                        <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}">${email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #475569;">Telefoonnummer:</td>
                        <td style="padding: 8px 0; color: #0f172a;"><a href="tel:${phone}">${phone}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #475569;">Organisatie:</td>
                        <td style="padding: 8px 0; color: #0f172a;">${company || 'Niet ingevuld'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #475569;">Portefeuille omvang:</td>
                        <td style="padding: 8px 0; color: #0f172a;">${portfolioSize || 'Niet gespecificeerd'}</td>
                    </tr>
                </table>
                
                ${message ? `
                <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #ff9400; border-radius: 4px;">
                    <p style="margin: 0 0 8px 0; font-weight: bold; color: #475569;">Bericht:</p>
                    <p style="margin: 0; color: #0f172a; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${message}</p>
                </div>
                ` : ''}
                
                <div style="margin-top: 30px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                    Deze e-mail is automatisch verzonden vanaf het demo formulier op emlinked.nl.
                </div>
            </div>
        `;

        const resendRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resendApiKey}`
            },
            body: JSON.stringify({
                from: `${mailFromName} <${mailFrom}>`,
                to: mailTo,
                subject: `Demo Aanvraag: ${name} (${company || 'Geen bedrijf'})`,
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
    } catch (error: any) {
        console.error('Demo request API error:', error);
        return NextResponse.json(
            { error: 'Interne server fout.' },
            { status: 500 }
        );
    }
}
