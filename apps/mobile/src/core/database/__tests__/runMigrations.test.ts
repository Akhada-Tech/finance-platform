import { MemoryDatabaseConnection } from '../MemoryDatabaseConnection';
import { runMigrations } from '../migrations/runner';
import type { Migration } from '../migrations/types';

describe('runMigrations', () => {
  it('creates schema_migrations and applies pending migrations once', async () => {
    const db = new MemoryDatabaseConnection();
    const calls: number[] = [];

    const migrations: Migration[] = [
      {
        version: 1,
        name: 'noop_one',
        up: async () => {
          calls.push(1);
        },
      },
      {
        version: 2,
        name: 'noop_two',
        up: async () => {
          calls.push(2);
        },
      },
    ];

    await runMigrations(db, migrations);
    await runMigrations(db, migrations);

    expect(calls).toEqual([1, 2]);

    const applied = await db.executeAsync<{ version: number }>(
      'SELECT version FROM schema_migrations ORDER BY version ASC',
    );
    expect(applied.rows.map(row => Number(row.version))).toEqual([1, 2]);
  });
});
