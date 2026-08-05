export type AppErrorCode =
  | 'UNKNOWN'
  | 'VALIDATION'
  | 'NOT_FOUND'
  | 'STORAGE'
  | 'DATABASE'
  | 'BOOTSTRAP';

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly cause?: unknown;

  constructor(code: AppErrorCode, message: string, cause?: unknown) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.cause = cause;
  }
}

export function toAppError(
  error: unknown,
  fallbackCode: AppErrorCode = 'UNKNOWN',
): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(fallbackCode, error.message, error);
  }

  return new AppError(fallbackCode, 'An unexpected error occurred.', error);
}
