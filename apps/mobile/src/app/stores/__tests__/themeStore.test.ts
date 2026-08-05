import {
  __resetStorageForTests,
  __setStorageForTests,
} from '../../../core/storage';
import { MemoryKeyValueStorage } from '../../../core/storage/MemoryKeyValueStorage';
import { StorageKeys } from '../../../core/storage/storageKeys';
import { __resetThemeStoreForTests, useThemeStore } from '../themeStore';

describe('useThemeStore', () => {
  let storage: MemoryKeyValueStorage;

  beforeEach(() => {
    __resetThemeStoreForTests();
    __resetStorageForTests();
    storage = new MemoryKeyValueStorage();
    __setStorageForTests({ preferences: storage });
  });

  afterEach(() => {
    __resetStorageForTests();
  });

  it('hydrates preference from storage', () => {
    storage.setString(StorageKeys.themePreference, 'dark');

    useThemeStore.getState().hydrate(storage);

    expect(useThemeStore.getState().preference).toBe('dark');
    expect(useThemeStore.getState().hydrated).toBe(true);
  });

  it('persists preference updates through KeyValueStorage', () => {
    useThemeStore.getState().hydrate(storage);
    useThemeStore.getState().setPreference('light');

    expect(storage.getString(StorageKeys.themePreference)).toBe('light');
    expect(useThemeStore.getState().preference).toBe('light');
  });
});
