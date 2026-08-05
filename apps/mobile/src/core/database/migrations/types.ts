import type { DatabaseExecutor } from '../types';

export type Migration = {
  /** Monotonic integer version. */
  version: number;
  /** Human-readable name for logs. */
  name: string;
  up: (db: DatabaseExecutor) => Promise<void>;
};
