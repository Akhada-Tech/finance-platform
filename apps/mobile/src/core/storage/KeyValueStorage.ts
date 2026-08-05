/**
 * Key/value storage contract.
 * Screens and features must depend on this — never on MMKV directly.
 */
export interface KeyValueStorage {
  getString(key: string): string | undefined;
  setString(key: string, value: string): void;
  getBoolean(key: string): boolean | undefined;
  setBoolean(key: string, value: boolean): void;
  getNumber(key: string): number | undefined;
  setNumber(key: string, value: number): void;
  contains(key: string): boolean;
  remove(key: string): boolean;
  getAllKeys(): string[];
  clearAll(): void;
}
