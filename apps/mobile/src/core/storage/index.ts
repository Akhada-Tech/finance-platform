import { loadAppConfig } from '../config/appConfig';
import type { KeyValueStorage } from './KeyValueStorage';
import { MemoryKeyValueStorage } from './MemoryKeyValueStorage';
import { MmkvKeyValueStorage } from './MmkvKeyValueStorage';

export type { KeyValueStorage } from './KeyValueStorage';
export { MemoryKeyValueStorage } from './MemoryKeyValueStorage';
export { StorageKeys } from './storageKeys';
export type { StorageKey } from './storageKeys';

let preferencesStorage: KeyValueStorage | null = null;
let secretsStorage: KeyValueStorage | null = null;

function shouldUseMemoryStorage(): boolean {
  return loadAppConfig().env === 'test';
}

/**
 * Preferences / UI flags. Not for business entities (those go in SQLite).
 */
export function getPreferencesStorage(): KeyValueStorage {
  if (!preferencesStorage) {
    preferencesStorage = shouldUseMemoryStorage()
      ? new MemoryKeyValueStorage()
      : new MmkvKeyValueStorage({ id: 'finance.preferences' });
  }

  return preferencesStorage;
}

/**
 * Secrets / sensitive tokens. Prefer this over preferences for credentials.
 * Encryption key wiring lands with a real keychain strategy later.
 */
export function getSecretsStorage(): KeyValueStorage {
  if (!secretsStorage) {
    secretsStorage = shouldUseMemoryStorage()
      ? new MemoryKeyValueStorage()
      : new MmkvKeyValueStorage({ id: 'finance.secrets' });
  }

  return secretsStorage;
}

/** Test-only: replace singletons. */
export function __setStorageForTests(options: {
  preferences?: KeyValueStorage;
  secrets?: KeyValueStorage;
}): void {
  if (options.preferences) {
    preferencesStorage = options.preferences;
  }
  if (options.secrets) {
    secretsStorage = options.secrets;
  }
}

export function __resetStorageForTests(): void {
  preferencesStorage = null;
  secretsStorage = null;
}
