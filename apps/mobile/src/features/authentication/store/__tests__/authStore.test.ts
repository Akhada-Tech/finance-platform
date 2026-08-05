import {
  __resetStorageForTests,
  __setStorageForTests,
} from '../../../../core/storage';
import { MemoryKeyValueStorage } from '../../../../core/storage/MemoryKeyValueStorage';
import { StorageKeys } from '../../../../core/storage/storageKeys';
import { __resetAuthStoreForTests, useAuthStore } from '../authStore';

describe('useAuthStore', () => {
  let storage: MemoryKeyValueStorage;

  beforeEach(() => {
    __resetAuthStoreForTests();
    __resetStorageForTests();
    storage = new MemoryKeyValueStorage();
    __setStorageForTests({ preferences: storage });
  });

  afterEach(() => {
    __resetStorageForTests();
  });

  it('defaults to authenticated on first launch', () => {
    useAuthStore.getState().hydrate(storage);

    expect(useAuthStore.getState().status).toBe('authenticated');
    expect(storage.getBoolean(StorageKeys.localSessionFlag)).toBe(true);
  });

  it('hydrates unauthenticated from storage', () => {
    storage.setBoolean(StorageKeys.localSessionFlag, false);

    useAuthStore.getState().hydrate(storage);

    expect(useAuthStore.getState().status).toBe('unauthenticated');
  });

  it('signOut persists unauthenticated session', () => {
    useAuthStore.getState().hydrate(storage);
    useAuthStore.getState().signOut();

    expect(useAuthStore.getState().status).toBe('unauthenticated');
    expect(storage.getBoolean(StorageKeys.localSessionFlag)).toBe(false);
  });
});
