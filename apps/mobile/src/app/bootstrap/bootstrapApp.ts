/**
 * Ordered app startup tasks.
 * Replace placeholders as core/database, storage, and config land.
 */
export async function bootstrapApp(): Promise<void> {
  // 1. Load configuration (core/config)
  // 2. Open SQLite + run migrations (core/database)
  // 3. Hydrate MMKV-backed preferences (core/storage + Zustand)
  // Intentionally a no-op until those modules exist.
  await Promise.resolve();
}
