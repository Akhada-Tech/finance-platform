import { loadAppConfig, type AppConfig } from '../../core/config/appConfig';
import {
  databaseService,
  type DatabaseService,
} from '../../core/database/DatabaseService';
import { logger } from '../../core/logging';
import {
  getPreferencesStorage,
  type KeyValueStorage,
} from '../../core/storage';
import { AppError, toAppError } from '../../core/utils/AppError';
import { hydrateClientStores } from './hydrateClientStores';

export type BootstrapDeps = {
  config?: AppConfig;
  database?: DatabaseService;
  preferencesStorage?: KeyValueStorage;
};

/**
 * Ordered app startup: config → database → storage → hydrate client stores.
 */
export async function bootstrapApp(deps: BootstrapDeps = {}): Promise<void> {
  try {
    const config = deps.config ?? loadAppConfig();
    logger.info('bootstrap.start', { env: config.env });

    const database = deps.database ?? databaseService;
    await database.initialize();

    const preferences = deps.preferencesStorage ?? getPreferencesStorage();
    preferences.contains('__bootstrap_probe__');
    hydrateClientStores(preferences);

    logger.info('bootstrap.ready', { env: config.env });
  } catch (error) {
    const appError = toAppError(error, 'BOOTSTRAP');
    logger.error('bootstrap.failed', {
      code: appError.code,
      message: appError.message,
    });
    throw new AppError('BOOTSTRAP', 'App bootstrap failed.', appError);
  }
}
