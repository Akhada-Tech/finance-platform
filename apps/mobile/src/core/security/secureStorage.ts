import { getSecretsStorage } from '../storage';
import type { KeyValueStorage } from '../storage/KeyValueStorage';

/**
 * Security façade over secrets storage.
 * Future: Keychain/Keystore-backed encryption keys, biometric unlock.
 */
export function getSecureStorage(): KeyValueStorage {
  return getSecretsStorage();
}
