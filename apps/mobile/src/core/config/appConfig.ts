export type AppEnvironment = 'development' | 'staging' | 'production' | 'test';

export type AppConfig = {
  env: AppEnvironment;
  appName: string;
  databaseName: string;
  /** Prefer verbose logs outside production. */
  enableVerboseLogging: boolean;
};

function resolveEnv(raw: string | undefined): AppEnvironment {
  switch (raw) {
    case 'production':
    case 'staging':
    case 'test':
    case 'development':
      return raw;
    default:
      return __DEV__ ? 'development' : 'production';
  }
}

function readEnv(name: string): string | undefined {
  const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process;
  return proc?.env?.[name];
}

/**
 * Typed app configuration.
 * Secrets never live here — use encrypted storage / secure env injection later.
 */
export function loadAppConfig(): AppConfig {
  const env = resolveEnv(readEnv('APP_ENV'));

  return {
    env,
    appName: 'Finance Platform',
    databaseName: 'finance_platform.db',
    enableVerboseLogging: env !== 'production',
  };
}
