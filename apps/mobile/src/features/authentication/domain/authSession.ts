/**
 * Local session stub until the Zustand auth store lands.
 * Offline V1 treats the user as signed in so Main Tabs are reachable.
 */
export type AuthStatus = 'authenticated' | 'unauthenticated';

export function getAuthStatus(): AuthStatus {
  return 'authenticated';
}
