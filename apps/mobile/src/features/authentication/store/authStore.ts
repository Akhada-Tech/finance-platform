import { create } from 'zustand';

import {
  getPreferencesStorage,
  StorageKeys,
  type KeyValueStorage,
} from '../../../core/storage';

export type AuthStatus = 'authenticated' | 'unauthenticated';

type AuthState = {
  status: AuthStatus;
  hydrated: boolean;
  signInLocally: () => void;
  signOut: () => void;
  hydrate: (storage?: KeyValueStorage) => void;
};

/**
 * Local session abstraction (Architecture §13).
 * Offline V1 defaults to authenticated when no flag is stored.
 * Future Supabase/Google/Apple/Phone auth replaces signInLocally without UI rewrites.
 */
export const useAuthStore = create<AuthState>((set, get) => ({
  status: 'authenticated',
  hydrated: false,

  signInLocally() {
    getPreferencesStorage().setBoolean(StorageKeys.localSessionFlag, true);
    set({ status: 'authenticated' });
  },

  signOut() {
    getPreferencesStorage().setBoolean(StorageKeys.localSessionFlag, false);
    set({ status: 'unauthenticated' });
  },

  hydrate(storage = getPreferencesStorage()) {
    if (get().hydrated) {
      return;
    }

    if (!storage.contains(StorageKeys.localSessionFlag)) {
      // First launch / offline V1: treat as signed in so Main Tabs are reachable.
      storage.setBoolean(StorageKeys.localSessionFlag, true);
      set({ status: 'authenticated', hydrated: true });
      return;
    }

    const active = storage.getBoolean(StorageKeys.localSessionFlag) ?? false;
    set({
      status: active ? 'authenticated' : 'unauthenticated',
      hydrated: true,
    });
  },
}));

/** Test-only reset. */
export function __resetAuthStoreForTests(): void {
  useAuthStore.setState({ status: 'authenticated', hydrated: false });
}
