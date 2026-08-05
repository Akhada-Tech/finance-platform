import { useAuthStore, type AuthStatus } from '../store/authStore';

export type { AuthStatus };

/** Imperative auth status for non-React callers. Prefer useAuthStore in components. */
export function getAuthStatus(): AuthStatus {
  return useAuthStore.getState().status;
}
