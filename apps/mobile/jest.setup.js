process.env.APP_ENV = 'test';

jest.mock('react-native-mmkv', () => {
  const stores = new Map();

  const createStore = () => {
    const map = new Map();
    return {
      getString: key => {
        const value = map.get(key);
        return typeof value === 'string' ? value : undefined;
      },
      getBoolean: key => {
        const value = map.get(key);
        return typeof value === 'boolean' ? value : undefined;
      },
      getNumber: key => {
        const value = map.get(key);
        return typeof value === 'number' ? value : undefined;
      },
      set: (key, value) => {
        map.set(key, value);
      },
      contains: key => map.has(key),
      remove: key => map.delete(key),
      getAllKeys: () => [...map.keys()],
      clearAll: () => map.clear(),
    };
  };

  return {
    createMMKV: ({ id = 'default' } = {}) => {
      if (!stores.has(id)) {
        stores.set(id, createStore());
      }
      return stores.get(id);
    },
  };
});

jest.mock('react-native-nitro-sqlite', () => ({
  open: () => ({
    close: () => undefined,
    delete: () => undefined,
    attach: () => undefined,
    detach: () => undefined,
    execute: () => ({
      rows: { _array: [], length: 0, item: () => undefined },
      rowsAffected: 0,
    }),
    executeAsync: async () => ({
      rows: { _array: [], length: 0, item: () => undefined },
      rowsAffected: 0,
    }),
    executeBatch: () => ({ rowsAffected: 0 }),
    executeBatchAsync: async () => ({ rowsAffected: 0 }),
    loadFile: () => ({ rowsAffected: 0 }),
    loadFileAsync: async () => ({ rowsAffected: 0 }),
    transaction: async fn =>
      fn({
        commit: () => ({}),
        rollback: () => ({}),
        execute: () => ({
          rows: { _array: [], length: 0, item: () => undefined },
          rowsAffected: 0,
        }),
        executeAsync: async () => ({
          rows: { _array: [], length: 0, item: () => undefined },
          rowsAffected: 0,
        }),
      }),
  }),
}));

/**
 * Registers app themes with the Unistyles Jest mock registry
 * so StyleSheet.create(theme => ...) receives a real theme.
 */
require('./src/app/theme/unistyles');
