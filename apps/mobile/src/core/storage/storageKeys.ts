/** Centralized storage keys — avoid stringly-typed access. */
export const StorageKeys = {
  themePreference: 'settings.themePreference',
  onboardingCompleted: 'settings.onboardingCompleted',
  localSessionFlag: 'auth.localSessionActive',
} as const;

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];
