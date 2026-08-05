import type { Repository } from '../types';

/**
 * Optional base for repositories that share cross-cutting helpers later.
 * Prefer composition — keep this class thin.
 */
export abstract class BaseRepository implements Repository {}
