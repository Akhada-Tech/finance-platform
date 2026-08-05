import type {
  DatabaseConnection,
  DatabaseExecutor,
  SqlCommand,
  SqlQueryResult,
  SqlValue,
} from './types';

type MemoryRow = Record<string, SqlValue>;

/**
 * Minimal in-memory executor for unit tests (not a full SQL engine).
 * Supports schema_migrations bookkeeping used by the migration runner.
 */
export class MemoryDatabaseConnection implements DatabaseConnection {
  private readonly tables = new Map<string, MemoryRow[]>();
  private closed = false;

  private assertOpen(): void {
    if (this.closed) {
      throw new Error('Memory database is closed.');
    }
  }

  async executeAsync<Row extends Record<string, SqlValue> = Record<string, SqlValue>>(
    sql: string,
    params: SqlValue[] = [],
  ): Promise<SqlQueryResult<Row>> {
    this.assertOpen();
    const normalized = sql.trim().replace(/\s+/g, ' ').toUpperCase();

    if (normalized.startsWith('CREATE TABLE IF NOT EXISTS SCHEMA_MIGRATIONS')) {
      if (!this.tables.has('schema_migrations')) {
        this.tables.set('schema_migrations', []);
      }
      return { rows: [], rowsAffected: 0 };
    }

    if (normalized.startsWith('SELECT VERSION FROM SCHEMA_MIGRATIONS')) {
      const rows = (this.tables.get('schema_migrations') ?? []) as Row[];
      return { rows, rowsAffected: 0 };
    }

    if (normalized.startsWith('INSERT INTO SCHEMA_MIGRATIONS')) {
      const rows = this.tables.get('schema_migrations') ?? [];
      rows.push({
        version: params[0] ?? null,
        name: params[1] ?? null,
        applied_at: params[2] ?? null,
      });
      this.tables.set('schema_migrations', rows);
      return { rows: [], rowsAffected: 1 };
    }

    // Default no-op for other statements in tests.
    return { rows: [], rowsAffected: 0 };
  }

  async executeBatchAsync(commands: SqlCommand[]): Promise<void> {
    for (const command of commands) {
      await this.executeAsync(command.sql, command.params);
    }
  }

  async transaction<T>(fn: (tx: DatabaseExecutor) => Promise<T>): Promise<T> {
    return fn(this);
  }

  close(): void {
    this.closed = true;
  }
}
