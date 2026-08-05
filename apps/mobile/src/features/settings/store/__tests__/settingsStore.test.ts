import {
  __resetStorageForTests,
  __setStorageForTests,
} from '../../../../core/storage';
import { MemoryKeyValueStorage } from '../../../../core/storage/MemoryKeyValueStorage';
import { StorageKeys } from '../../../../core/storage/storageKeys';
import { __resetSettingsStoreForTests, useSettingsStore } from '../settingsStore';

describe('useSettingsStore', () => {
  let storage: MemoryKeyValueStorage;

  beforeEach(() => {
    __resetSettingsStoreForTests();
    __resetStorageForTests();
    storage = new MemoryKeyValueStorage();
    __setStorageForTests({ preferences: storage });
  });

  afterEach(() => {
    __resetStorageForTests();
  });

  it('persists onboarding flag', () => {
    useSettingsStore.getState().hydrate(storage);
    useSettingsStore.getState().setOnboardingCompleted(true);

    expect(storage.getBoolean(StorageKeys.onboardingCompleted)).toBe(true);
    expect(useSettingsStore.getState().onboardingCompleted).toBe(true);
  });
});
