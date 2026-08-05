import type { FieldError, FieldErrors, FieldValues } from 'react-hook-form';
import type { z } from 'zod';

/**
 * Returns the first error message for a named field, if present.
 */
export function getFieldErrorMessage<T extends FieldValues>(
  errors: FieldErrors<T>,
  name: keyof T & string,
): string | undefined {
  const error = errors[name] as FieldError | undefined;
  return typeof error?.message === 'string' ? error.message : undefined;
}

/**
 * Parses unknown input with a Zod schema and returns a typed Result-like object.
 * Useful outside RHF (e.g. validating repository inputs).
 */
export function parseWithSchema<TSchema extends z.ZodType>(
  schema: TSchema,
  value: unknown,
):
  | { success: true; data: z.infer<TSchema> }
  | { success: false; message: string; issues: z.core.$ZodIssue[] } {
  const result = schema.safeParse(value);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const first = result.error.issues[0];
  return {
    success: false,
    message: first?.message ?? 'Validation failed',
    issues: result.error.issues,
  };
}
