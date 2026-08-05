import { logger } from '../../logging';
import { AppError } from '../../utils/AppError';
import type { DatabaseExecutor } from '../types';
import type { Migration } from './types';

const MIGRATIONS_TABLE = `
CREATE TABLE IF NOT EXISTS schema_migrations (
  version INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  applied_at TEXT NOT NULL
);
`;

async function ensureMigrationsTable(db: DatabaseExecutor): Promise<void> {
  await db.executeAsync(MIGRATIONS_TABLE);
}

async function getAppliedVersions(db: DatabaseExecutor): Promise<Set<number>> {
  const result = await db.executeAsync<{ version: number }>(
    'SELECT version FROM schema_migrations ORDER BY version ASC',
  );

  return new Set(result.rows.map(row => Number(row.version)));
}

/**
 * Applies pending migrations in version order.
 * Business table migrations are added by features later — list may be empty.
 */
export async function runMigrations(
  db: DatabaseExecutor,
  migrations: Migration[],
): Promise<void> {
  await ensureMigrationsTable(db);

  const sorted = [...migrations].sort((a, b) => a.version - b.version);
  for (let i = 1; i < sorted.length; i += 1) {
    const prev = sorted[i - 1];
    const curr = sorted[i];
    if (!prev || !curr) {
      continue;
    }
    if (curr.version <= prev.version) {
      throw new AppError(
        'DATABASE',
        `Migration versions must be unique and increasing (saw ${prev.version} then ${curr.version}).`,
      );
    }
  }

  const applied = await getAppliedVersions(db);

  for (const migration of sorted) {
    if (applied.has(migration.version)) {
      continue;
    }

    logger.info('database.migration.apply', {
      version: migration.version,
      name: migration.name,
    });

    try {
      await db.transaction(async tx => {
        await migration.up(tx);
        await tx.executeAsync(
          'INSERT INTO schema_migrations (version, name, applied_at) VALUES (?, ?, ?)',
          [migration.version, migration.name, new Date().toISOString()],
        );
      });
    } catch (error) {
      throw new AppError(
        'DATABASE',
        `Migration ${migration.version}_${migration.name} failed.`,
        error,
      );
    }
  }
}
