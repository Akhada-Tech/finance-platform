import { MemoryKeyValueStorage } from '../MemoryKeyValueStorage';
import { StorageKeys } from '../storageKeys';

describe('MemoryKeyValueStorage', () => {
  it('stores and reads primitives', () => {
    const storage = new MemoryKeyValueStorage();

    storage.setString(StorageKeys.themePreference, 'dark');
    storage.setBoolean(StorageKeys.onboardingCompleted, true);
    storage.setNumber('counter', 3);

    expect(storage.getString(StorageKeys.themePreference)).toBe('dark');
    expect(storage.getBoolean(StorageKeys.onboardingCompleted)).toBe(true);
    expect(storage.getNumber('counter')).toBe(3);
    expect(storage.contains(StorageKeys.themePreference)).toBe(true);

    storage.remove('counter');
    expect(storage.contains('counter')).toBe(false);
  });
});
