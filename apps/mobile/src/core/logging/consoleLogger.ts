import type { LogContext, LogLevel, Logger } from './Logger';

const levelOrder: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

type ConsoleLoggerOptions = {
  minLevel?: LogLevel;
  namespace?: string;
};

function format(namespace: string, message: string, context?: LogContext): string {
  const suffix =
    context && Object.keys(context).length > 0 ? ` ${JSON.stringify(context)}` : '';
  return `[${namespace}] ${message}${suffix}`;
}

export function createConsoleLogger(
  options: ConsoleLoggerOptions = {},
): Logger {
  const minLevel = options.minLevel ?? 'debug';
  const namespace = options.namespace ?? 'app';

  const shouldLog = (level: LogLevel): boolean =>
    levelOrder[level] >= levelOrder[minLevel];

  return {
    debug(message, context) {
      if (shouldLog('debug')) {
        console.debug(format(namespace, message, context));
      }
    },
    info(message, context) {
      if (shouldLog('info')) {
        console.info(format(namespace, message, context));
      }
    },
    warn(message, context) {
      if (shouldLog('warn')) {
        console.warn(format(namespace, message, context));
      }
    },
    error(message, context) {
      if (shouldLog('error')) {
        console.error(format(namespace, message, context));
      }
    },
  };
}
