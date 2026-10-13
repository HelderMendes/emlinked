/**
 * Server-side Google reCAPTCHA v2 verification, shared by every lead-capture
 * API route (/api/demo, /api/quote, ...). No-ops (passes) when
 * RECAPTCHA_SECRET_KEY isn't configured, matching the existing /api/demo
 * behavior so local dev without the env var still works.
 */
export async function verifyRecaptcha(
    token: string | null | undefined,
    isEn: boolean = false,
): Promise<{ success: true } | { success: false; error: string; status: number }> {
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
        return { success: true };
    }

    if (!token) {
        return {
            success: false,
            error: isEn
                ? 'reCAPTCHA verification failed (no token).'
                : 'reCAPTCHA verificatie mislukt (geen token).',
            status: 400,
        };
    }

    try {
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${token}`;
        const verifyRes = await fetch(verifyUrl, { method: 'POST' });
        const verifyJson = await verifyRes.json();

        if (!verifyJson.success) {
            return {
                success: false,
                error: isEn
                    ? 'reCAPTCHA verification failed. Please try again.'
                    : 'reCAPTCHA verificatie mislukt. Probeer het opnieuw.',
                status: 400,
            };
        }
    } catch (err) {
        console.error('reCAPTCHA siteverify error:', err);
        return {
            success: false,
            error: isEn
                ? 'Error verifying reCAPTCHA.'
                : 'Fout bij reCAPTCHA verificatie.',
            status: 500,
        };
    }

    return { success: true };
}
