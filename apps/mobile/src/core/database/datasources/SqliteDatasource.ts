import type { DatabaseConnection, Datasource } from '../types';

/**
 * Base local datasource.
 * Feature datasources extend this and talk to SQLite through DatabaseConnection.
 * Cloud datasources will implement Datasource separately without extending this.
 */
export abstract class SqliteDatasource implements Datasource {
  protected constructor(protected readonly db: DatabaseConnection) {}
}
