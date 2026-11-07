import { z } from 'zod';

/**
 * Escapes HTML special characters to prevent HTML/XSS injection in
 * transactional email templates (Resend).
 */
export function escapeHtml(value: string | null | undefined): string {
    if (!value) return '';
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Strips CR/LF characters and excessive whitespace to prevent email header
 * or subject-line injection.
 */
export function sanitizeSubjectText(value: string | null | undefined): string {
    if (!value) return '';
    return String(value)
        .replace(/[\r\n]+/g, ' ')
        .trim()
        .slice(0, 120);
}

const selectedItemLabelSchema = z.object({
    label: z.string().trim().max(200),
    priceFormatted: z.string().trim().max(60).optional(),
});

const selectedItemSchema = z.object({
    category: z.string().trim().min(1).max(200),
    label: z.string().trim().max(200).optional(),
    labels: z.array(selectedItemLabelSchema).max(20).optional(),
    priceFormatted: z.string().trim().min(1).max(60),
    isNaBerekening: z.boolean().optional(),
});

export const quoteCalculationPayloadSchema = z.object({
    oneTimeItems: z.array(selectedItemSchema).max(50).default([]),
    monthlyItems: z.array(selectedItemSchema).max(50).default([]),
    baseMonthlyPrice: z.string().trim().max(60).default('€ 144,80'),
    monthlyAdditions: z.string().trim().max(60).default('€ 0,00'),
    supportFee: z.string().trim().max(60).default('€ 28,96'),
    totalOneTime: z.string().trim().max(60).default('€ 0,00'),
    totalMonthly: z.string().trim().max(60).default('€ 173,76'),
});

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
            )
            .max(120),
        email: z
            .string()
            .trim()
            .min(
                1,
                isEn
                    ? 'Email address is required.'
                    : 'E-mailadres is verplicht.',
            )
            .max(254)
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
            .max(40)
            .refine(
                (val) => {
                    const digits = val.replace(/\D/g, '');
                    return digits.length >= 8 && digits.length <= 15;
                },
                isEn
                    ? 'Enter a valid phone number (8–15 digits, incl. country code).'
                    : 'Vul een geldig telefoonnummer in (8–15 cijfers, incl. landcode).',
            ),
        company: z.string().trim().max(150).optional(),
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
