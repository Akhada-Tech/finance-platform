import { loadAppConfig } from '../config/appConfig';
import { logger } from '../logging';
import { AppError } from '../utils/AppError';
import { MemoryDatabaseConnection } from './MemoryDatabaseConnection';
import { migrations } from './migrations';
import { runMigrations } from './migrations/runner';
import { openSqliteConnection } from './sqliteConnection';
import type { DatabaseConnection } from './types';

/**
 * Owns SQLite lifecycle: open → migrate → expose connection.
 * Features never open their own database handles.
 */
export class DatabaseService {
  private connection: DatabaseConnection | null = null;

  async initialize(): Promise<DatabaseConnection> {
    if (this.connection) {
      return this.connection;
    }

    const config = loadAppConfig();

    try {
      this.connection =
        config.env === 'test'
          ? new MemoryDatabaseConnection()
          : openSqliteConnection(config.databaseName);

      await runMigrations(this.connection, migrations);
      logger.info('database.ready', { name: config.databaseName, env: config.env });
      return this.connection;
    } catch (error) {
      this.connection = null;
      throw new AppError('DATABASE', 'Database initialization failed.', error);
    }
  }

  getConnection(): DatabaseConnection {
    if (!this.connection) {
      throw new AppError(
        'DATABASE',
        'Database has not been initialized. Call initialize() during bootstrap.',
      );
    }

    return this.connection;
  }

  async close(): Promise<void> {
    if (!this.connection) {
      return;
    }

    this.connection.close();
    this.connection = null;
  }

  /** Test-only: inject a connection before initialize. */
  __setConnectionForTests(connection: DatabaseConnection | null): void {
    this.connection = connection;
  }
}

export const databaseService = new DatabaseService();
