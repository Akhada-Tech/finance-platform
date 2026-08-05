import { open, type NitroSQLiteConnection } from 'react-native-nitro-sqlite';

import { AppError } from '../utils/AppError';
import type {
  DatabaseConnection,
  DatabaseExecutor,
  SqlCommand,
  SqlQueryResult,
  SqlValue,
} from './types';

function mapResult<Row extends Record<string, SqlValue>>(
  result: Awaited<ReturnType<NitroSQLiteConnection['executeAsync']>>,
): SqlQueryResult<Row> {
  return {
    rows: (result.rows?._array ?? []) as Row[],
    rowsAffected: result.rowsAffected ?? 0,
    insertId: result.insertId,
  };
}

function createExecutor(connection: NitroSQLiteConnection): DatabaseExecutor {
  return {
    async executeAsync<Row extends Record<string, SqlValue>>(
      sql: string,
      params?: SqlValue[],
    ): Promise<SqlQueryResult<Row>> {
      try {
        const result = await connection.executeAsync(sql, params);
        return mapResult<Row>(result);
      } catch (error) {
        throw new AppError('DATABASE', 'SQLite executeAsync failed.', error);
      }
    },

    async executeBatchAsync(commands: SqlCommand[]): Promise<void> {
      try {
        await connection.executeBatchAsync(
          commands.map(command => ({
            query: command.sql,
            params: command.params,
          })),
        );
      } catch (error) {
        throw new AppError('DATABASE', 'SQLite executeBatchAsync failed.', error);
      }
    },

    async transaction<T>(fn: (tx: DatabaseExecutor) => Promise<T>): Promise<T> {
      try {
        return await connection.transaction(async nativeTx => {
          const txExecutor: DatabaseExecutor = {
            async executeAsync<Row extends Record<string, SqlValue>>(
              sql: string,
              params?: SqlValue[],
            ): Promise<SqlQueryResult<Row>> {
              const result = await nativeTx.executeAsync(sql, params);
              return mapResult<Row>(result);
            },
            async executeBatchAsync(commands: SqlCommand[]): Promise<void> {
              // Nitro transaction object has no batch helper — run serially.
              for (const command of commands) {
                await nativeTx.executeAsync(command.sql, command.params);
              }
            },
            async transaction<U>(
              nested: (inner: DatabaseExecutor) => Promise<U>,
            ): Promise<U> {
              // Nested transactions are not supported; reuse the same executor.
              return nested(txExecutor);
            },
          };

          return fn(txExecutor);
        });
      } catch (error) {
        throw new AppError('DATABASE', 'SQLite transaction failed.', error);
      }
    },
  };
}

export function openSqliteConnection(name: string): DatabaseConnection {
  try {
    const connection = open({ name });
    const executor = createExecutor(connection);

    return {
      ...executor,
      close() {
        connection.close();
      },
    };
  } catch (error) {
    throw new AppError('DATABASE', `Failed to open SQLite database "${name}".`, error);
  }
}
