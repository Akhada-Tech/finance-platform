import { loadAppConfig } from '../config/appConfig';
import { createConsoleLogger } from './consoleLogger';
import type { Logger } from './Logger';

const config = loadAppConfig();

export const logger: Logger = createConsoleLogger({
  namespace: 'finance',
  minLevel: config.enableVerboseLogging ? 'debug' : 'info',
});

export type { Logger, LogContext, LogLevel } from './Logger';
export { createConsoleLogger } from './consoleLogger';
