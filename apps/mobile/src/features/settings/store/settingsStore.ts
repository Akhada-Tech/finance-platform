import { create } from 'zustand';

import {
  getPreferencesStorage,
  StorageKeys,
  type KeyValueStorage,
} from '../../../core/storage';

type SettingsState = {
  onboardingCompleted: boolean;
  hydrated: boolean;
  setOnboardingCompleted: (completed: boolean) => void;
  hydrate: (storage?: KeyValueStorage) => void;
};

/**
 * UI preferences / settings flags.
 * No business entities — those stay in SQLite via repositories.
 */
export const useSettingsStore = create<SettingsState>((set, get) => ({
  onboardingCompleted: false,
  hydrated: false,

  setOnboardingCompleted(completed) {
    set({ onboardingCompleted: completed });
    getPreferencesStorage().setBoolean(
      StorageKeys.onboardingCompleted,
      completed,
    );
  },

  hydrate(storage = getPreferencesStorage()) {
    if (get().hydrated) {
      return;
    }

    const saved = storage.getBoolean(StorageKeys.onboardingCompleted);
    set({
      onboardingCompleted: saved ?? false,
      hydrated: true,
    });
  },
}));

/** Test-only reset. */
export function __resetSettingsStoreForTests(): void {
  useSettingsStore.setState({ onboardingCompleted: false, hydrated: false });
}
