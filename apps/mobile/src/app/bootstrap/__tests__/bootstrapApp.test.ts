import { DatabaseService } from '../../../core/database/DatabaseService';
import { MemoryDatabaseConnection } from '../../../core/database/MemoryDatabaseConnection';
import { MemoryKeyValueStorage } from '../../../core/storage/MemoryKeyValueStorage';
import { bootstrapApp } from '../bootstrapApp';

describe('bootstrapApp', () => {
  it('initializes database and storage', async () => {
    const database = new DatabaseService();
    database.__setConnectionForTests(null);

    await expect(
      bootstrapApp({
        config: {
          env: 'test',
          appName: 'Finance Platform',
          databaseName: 'test.db',
          enableVerboseLogging: false,
        },
        database,
        preferencesStorage: new MemoryKeyValueStorage(),
      }),
    ).resolves.toBeUndefined();

    expect(database.getConnection()).toBeInstanceOf(MemoryDatabaseConnection);
  });
});
