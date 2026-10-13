import { z } from 'zod';

/**
 * Shared contact-field validation for the pricing calculator's quote
 * request — used both client-side (inline field errors, pre-submit) and
 * server-side in /api/quote (authoritative check; the client check alone
 * can always be bypassed).
 */
export function createQuoteContactSchema(isEn: boolean) {
    return z.object({
        name: z
            .string()
            .trim()
            .min(
                2,
                isEn
                    ? 'Enter your full name (min. 2 characters).'
                    : 'Vul je volledige naam in (min. 2 tekens).',
            ),
        email: z
            .string()
            .trim()
            .min(
                1,
                isEn
                    ? 'Email address is required.'
                    : 'E-mailadres is verplicht.',
            )
            .email(
                isEn
                    ? 'Enter a valid email address.'
                    : 'Vul een geldig e-mailadres in.',
            ),
        phone: z
            .string()
            .trim()
            .min(
                1,
                isEn
                    ? 'Phone number is required.'
                    : 'Telefoonnummer is verplicht.',
            )
            .refine(
                (val) => {
                    const digits = val.replace(/\D/g, '');
                    return digits.length >= 8 && digits.length <= 15;
                },
                isEn
                    ? 'Enter a valid phone number (8–15 digits, incl. country code).'
                    : 'Vul een geldig telefoonnummer in (8–15 cijfers, incl. landcode).',
            ),
        company: z.string().trim().optional(),
    });
}

export type QuoteContactInput = z.infer<
    ReturnType<typeof createQuoteContactSchema>
>;

export type QuoteContactFieldErrors = Partial<
    Record<keyof QuoteContactInput, string>
>;

/** Flattens a ZodError into one message per field (first issue wins). */
export function flattenQuoteContactErrors(
    error: z.ZodError,
): QuoteContactFieldErrors {
    const fieldErrors: QuoteContactFieldErrors = {};
    for (const issue of error.issues) {
        const key = issue.path[0] as keyof QuoteContactInput | undefined;
        if (key && !fieldErrors[key]) {
            fieldErrors[key] = issue.message;
        }
    }
    return fieldErrors;
}
