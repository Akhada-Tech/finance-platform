import { createMMKV } from 'react-native-mmkv';

import { AppError } from '../utils/AppError';
import type { KeyValueStorage } from './KeyValueStorage';

type MmkvKeyValueStorageOptions = {
  id: string;
  encryptionKey?: string;
};

/**
 * MMKV-backed KeyValueStorage.
 * Construct only from core/storage factories — not from screens.
 */
export class MmkvKeyValueStorage implements KeyValueStorage {
  private readonly mmkv;

  constructor(options: MmkvKeyValueStorageOptions) {
    try {
      this.mmkv = createMMKV({
        id: options.id,
        ...(options.encryptionKey
          ? { encryptionKey: options.encryptionKey }
          : {}),
      });
    } catch (error) {
      throw new AppError(
        'STORAGE',
        `Failed to open MMKV instance "${options.id}".`,
        error,
      );
    }
  }

  getString(key: string): string | undefined {
    return this.mmkv.getString(key);
  }

  setString(key: string, value: string): void {
    this.mmkv.set(key, value);
  }

  getBoolean(key: string): boolean | undefined {
    return this.mmkv.getBoolean(key);
  }

  setBoolean(key: string, value: boolean): void {
    this.mmkv.set(key, value);
  }

  getNumber(key: string): number | undefined {
    return this.mmkv.getNumber(key);
  }

  setNumber(key: string, value: number): void {
    this.mmkv.set(key, value);
  }

  contains(key: string): boolean {
    return this.mmkv.contains(key);
  }

  remove(key: string): boolean {
    return this.mmkv.remove(key);
  }

  getAllKeys(): string[] {
    return this.mmkv.getAllKeys();
  }

  clearAll(): void {
    this.mmkv.clearAll();
  }
}
