import { create } from 'zustand';

import {
  getPreferencesStorage,
  StorageKeys,
  type KeyValueStorage,
} from '../../core/storage';

export type ColorSchemePreference = 'light' | 'dark' | 'system';

type ThemeState = {
  preference: ColorSchemePreference;
  hydrated: boolean;
  setPreference: (preference: ColorSchemePreference) => void;
  hydrate: (storage?: KeyValueStorage) => void;
};

function isColorSchemePreference(value: string): value is ColorSchemePreference {
  return value === 'light' || value === 'dark' || value === 'system';
}

/**
 * Theme preference (client state). Persisted via KeyValueStorage — never MMKV directly.
 */
export const useThemeStore = create<ThemeState>((set, get) => ({
  preference: 'system',
  hydrated: false,

  setPreference(preference) {
    set({ preference });
    getPreferencesStorage().setString(StorageKeys.themePreference, preference);
  },

  hydrate(storage = getPreferencesStorage()) {
    if (get().hydrated) {
      return;
    }

    const saved = storage.getString(StorageKeys.themePreference);
    if (saved && isColorSchemePreference(saved)) {
      set({ preference: saved, hydrated: true });
      return;
    }

    set({ hydrated: true });
  },
}));

/** Test-only reset. */
export function __resetThemeStoreForTests(): void {
  useThemeStore.setState({ preference: 'system', hydrated: false });
}
