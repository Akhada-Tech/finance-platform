import { bootstrapApp } from '../bootstrapApp';

describe('bootstrapApp', () => {
  it('resolves without throwing', async () => {
    await expect(bootstrapApp()).resolves.toBeUndefined();
  });
});
