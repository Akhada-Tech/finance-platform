import type { KeyValueStorage } from './KeyValueStorage';

/** In-memory storage for tests and non-native environments. */
export class MemoryKeyValueStorage implements KeyValueStorage {
  private readonly store = new Map<string, string | boolean | number>();

  getString(key: string): string | undefined {
    const value = this.store.get(key);
    return typeof value === 'string' ? value : undefined;
  }

  setString(key: string, value: string): void {
    this.store.set(key, value);
  }

  getBoolean(key: string): boolean | undefined {
    const value = this.store.get(key);
    return typeof value === 'boolean' ? value : undefined;
  }

  setBoolean(key: string, value: boolean): void {
    this.store.set(key, value);
  }

  getNumber(key: string): number | undefined {
    const value = this.store.get(key);
    return typeof value === 'number' ? value : undefined;
  }

  setNumber(key: string, value: number): void {
    this.store.set(key, value);
  }

  contains(key: string): boolean {
    return this.store.has(key);
  }

  remove(key: string): boolean {
    return this.store.delete(key);
  }

  getAllKeys(): string[] {
    return [...this.store.keys()];
  }

  clearAll(): void {
    this.store.clear();
  }
}
