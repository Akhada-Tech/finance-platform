import { DatabaseService } from '../../../core/database/DatabaseService';
import { MemoryDatabaseConnection } from '../../../core/database/MemoryDatabaseConnection';
import { MemoryKeyValueStorage } from '../../../core/storage/MemoryKeyValueStorage';
import { __resetAuthStoreForTests, useAuthStore } from '../../../features/authentication/store/authStore';
import { __resetSettingsStoreForTests, useSettingsStore } from '../../../features/settings/store/settingsStore';
import { __resetThemeStoreForTests, useThemeStore } from '../../stores/themeStore';
import { bootstrapApp } from '../bootstrapApp';

describe('bootstrapApp', () => {
  beforeEach(() => {
    __resetThemeStoreForTests();
    __resetSettingsStoreForTests();
    __resetAuthStoreForTests();
  });

  it('initializes database and hydrates client stores', async () => {
    const database = new DatabaseService();
    database.__setConnectionForTests(null);
    const preferencesStorage = new MemoryKeyValueStorage();

    await expect(
      bootstrapApp({
        config: {
          env: 'test',
          appName: 'Finance Platform',
          databaseName: 'test.db',
          enableVerboseLogging: false,
        },
        database,
        preferencesStorage,
      }),
    ).resolves.toBeUndefined();

    expect(database.getConnection()).toBeInstanceOf(MemoryDatabaseConnection);
    expect(useThemeStore.getState().hydrated).toBe(true);
    expect(useSettingsStore.getState().hydrated).toBe(true);
    expect(useAuthStore.getState().hydrated).toBe(true);
    expect(useAuthStore.getState().status).toBe('authenticated');
  });
});
