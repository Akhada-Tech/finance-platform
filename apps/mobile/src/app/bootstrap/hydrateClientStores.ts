import type { KeyValueStorage } from '@/core/storage';
import { useAuthStore } from '@/features/authentication/store/authStore';
import { useSettingsStore } from '@/features/settings/store/settingsStore';

import { useThemeStore } from '../stores/themeStore';

/**
 * Hydrates Zustand client stores from KeyValueStorage after DB/storage are ready.
 */
export function hydrateClientStores(storage: KeyValueStorage): void {
  useThemeStore.getState().hydrate(storage);
  useSettingsStore.getState().hydrate(storage);
  useAuthStore.getState().hydrate(storage);
}
