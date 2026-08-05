# shared/forms/

## Why it exists

Shared React Hook Form + Zod helpers so features don’t reinvent validation wiring.

## Stack

- `react-hook-form`
- `zod` (v4)
- `@hookform/resolvers` via `createZodResolver`

## What belongs here

- Common reusable Zod schemas (`validators.ts`) — email, Indian phone, amount, …
- RHF resolver helper (`createZodResolver`)
- Small form error / parse helpers

## Usage (feature form)

```ts
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { amountSchema, createZodResolver, requiredString } from '@/shared/forms';

const schema = z.object({
  name: requiredString('Name is required'),
  amount: amountSchema,
});

type FormValues = z.infer<typeof schema>;

const form = useForm<FormValues>({
  resolver: createZodResolver(schema),
  defaultValues: { name: '', amount: '' },
});
```

## What must never go here

- Feature-specific schemas (`features/<name>/validation`)
- Screen layouts / TextInput components (use `shared/components` when built)
- Business domain rules that belong in `features/*/domain`
