import { z } from 'zod';

/** Non-empty trimmed string. */
export function requiredString(message = 'This field is required') {
  return z.string().trim().min(1, message);
}

/** Standard email address. */
export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .email('Enter a valid email');

/**
 * Indian mobile number.
 * Accepts optional +91 / spaces / dashes; normalizes to 10 digits.
 */
export const indianPhoneSchema = z
  .string()
  .trim()
  .min(1, 'Phone number is required')
  .transform(value => value.replace(/[\s-]/g, ''))
  .refine(
    value => /^(\+91)?[6-9]\d{9}$/.test(value),
    'Enter a valid 10-digit Indian mobile number',
  )
  .transform(value => value.replace(/^\+91/, ''));

/**
 * Money amount as form string input (INR-friendly).
 * Max 2 decimal places; must be > 0. Outputs a number.
 */
export const amountSchema = z
  .string()
  .trim()
  .min(1, 'Amount is required')
  .regex(/^\d+(\.\d{1,2})?$/, 'Enter a valid amount (max 2 decimals)')
  .refine(value => Number(value) > 0, 'Amount must be greater than zero')
  .transform(value => Number(value));

/** Optional trimmed string that becomes undefined when empty. */
export const optionalString = z
  .string()
  .trim()
  .optional()
  .transform(value => (value && value.length > 0 ? value : undefined));

export type Email = z.infer<typeof emailSchema>;
export type IndianPhone = z.infer<typeof indianPhoneSchema>;
export type Amount = z.infer<typeof amountSchema>;
