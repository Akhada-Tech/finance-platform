import { z } from 'zod';

import { createZodResolver } from '../createZodResolver';
import { getFieldErrorMessage, parseWithSchema } from '../parseWithSchema';
import {
  amountSchema,
  emailSchema,
  indianPhoneSchema,
  requiredString,
} from '../validators';

describe('validators', () => {
  describe('requiredString', () => {
    it('rejects blank values', () => {
      expect(requiredString().safeParse('   ').success).toBe(false);
      expect(requiredString().safeParse('Cash').success).toBe(true);
    });
  });

  describe('emailSchema', () => {
    it('validates email format', () => {
      expect(emailSchema.safeParse('user@example.com').success).toBe(true);
      expect(emailSchema.safeParse('not-an-email').success).toBe(false);
    });
  });

  describe('indianPhoneSchema', () => {
    it('accepts +91 and normalizes to 10 digits', () => {
      const result = indianPhoneSchema.safeParse('+91 98765-43210');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('9876543210');
      }
    });

    it('rejects invalid numbers', () => {
      expect(indianPhoneSchema.safeParse('12345').success).toBe(false);
      expect(indianPhoneSchema.safeParse('5123456789').success).toBe(false);
    });
  });

  describe('amountSchema', () => {
    it('parses INR-friendly amounts', () => {
      const result = amountSchema.safeParse('1250.50');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(1250.5);
      }
    });

    it('rejects more than 2 decimals or zero', () => {
      expect(amountSchema.safeParse('10.123').success).toBe(false);
      expect(amountSchema.safeParse('0').success).toBe(false);
    });
  });
});

describe('parseWithSchema', () => {
  it('returns typed data or first message', () => {
    const ok = parseWithSchema(emailSchema, 'a@b.co');
    expect(ok.success).toBe(true);

    const bad = parseWithSchema(emailSchema, 'nope');
    expect(bad.success).toBe(false);
    if (!bad.success) {
      expect(bad.message.length).toBeGreaterThan(0);
    }
  });
});

describe('createZodResolver', () => {
  it('builds a resolver function from a schema', () => {
    const schema = z.object({
      name: requiredString(),
    });

    const resolver = createZodResolver(schema);
    expect(typeof resolver).toBe('function');
  });
});

describe('getFieldErrorMessage', () => {
  it('reads message from FieldErrors', () => {
    expect(
      getFieldErrorMessage(
        { name: { type: 'required', message: 'Name is required' } },
        'name',
      ),
    ).toBe('Name is required');
  });
});
