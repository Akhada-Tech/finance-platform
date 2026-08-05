import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldValues, Resolver } from 'react-hook-form';
import type { z } from 'zod';

/**
 * Creates a React Hook Form resolver from a Zod schema.
 * Prefer this over importing zodResolver in every feature form.
 */
export function createZodResolver<TFieldValues extends FieldValues>(
  schema: z.ZodType<TFieldValues, TFieldValues>,
): Resolver<TFieldValues> {
  return zodResolver(schema);
}
