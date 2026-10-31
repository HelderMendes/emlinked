/**
 * Server-side Google reCAPTCHA v3 verification, shared by every lead-capture
 * API route (/api/demo, /api/quote, ...). No-ops (passes) when
 * RECAPTCHA_SECRET_KEY isn't configured, matching the existing /api/demo
 * behavior so local dev without the env var still works.
 *
 * v3 is score-based (0.0-1.0, no user challenge) instead of v2's pass/fail
 * checkbox, so a low score is rejected here instead of being surfaced as a
 * retry-able challenge — there's no "try again" step for the visitor.
 */
const RECAPTCHA_SCORE_THRESHOLD = 0.5;

export async function verifyRecaptcha(
    token: string | null | undefined,
    isEn: boolean = false,
    expectedAction?: string,
): Promise<
    | { success: true; score: number }
    | { success: false; error: string; status: number }
> {
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
        return { success: true, score: 1 };
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

        if (expectedAction && verifyJson.action !== expectedAction) {
            console.error(
                'reCAPTCHA action mismatch:',
                verifyJson.action,
                'expected',
                expectedAction,
            );
            return {
                success: false,
                error: isEn
                    ? 'reCAPTCHA verification failed. Please try again.'
                    : 'reCAPTCHA verificatie mislukt. Probeer het opnieuw.',
                status: 400,
            };
        }

        const score =
            typeof verifyJson.score === 'number' ? verifyJson.score : 1;
        if (
            score < RECAPTCHA_SCORE_THRESHOLD &&
            process.env.NODE_ENV === 'production'
        ) {
            console.warn('reCAPTCHA low score:', score, 'action:', expectedAction);
            return {
                success: false,
                error: isEn
                    ? 'Submission blocked as suspicious activity. Please contact us directly if this is a mistake.'
                    : 'Aanvraag geblokkeerd wegens verdachte activiteit. Neem direct contact op als dit een vergissing is.',
                status: 400,
            };
        }

        return { success: true, score };
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
}
