/**
 * Storage / repository / datasource contracts used across the data layer.
 * Feature modules implement these; core provides infrastructure only.
 */

/** Marker for domain repositories (business-friendly APIs, no SQL names). */
export interface Repository {}

/** Marker for datasources (SQLite today, cloud later). */
export interface Datasource {}

export type SqlValue = string | number | boolean | null;

export type SqlQueryResult<Row extends Record<string, SqlValue> = Record<string, SqlValue>> = {
  rows: Row[];
  rowsAffected: number;
  insertId?: number;
};

export type SqlCommand = {
  sql: string;
  params?: SqlValue[];
};

/**
 * Backend-agnostic database executor.
 * Feature datasources depend on this — not on Nitro SQLite types.
 */
export interface DatabaseExecutor {
  executeAsync<Row extends Record<string, SqlValue> = Record<string, SqlValue>>(
    sql: string,
    params?: SqlValue[],
  ): Promise<SqlQueryResult<Row>>;
  executeBatchAsync(commands: SqlCommand[]): Promise<void>;
  transaction<T>(fn: (tx: DatabaseExecutor) => Promise<T>): Promise<T>;
}

export interface DatabaseConnection extends DatabaseExecutor {
  close(): void;
}
