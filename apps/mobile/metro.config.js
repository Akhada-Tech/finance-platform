const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');
const srcRoot = path.resolve(projectRoot, 'src');

/**
 * Metro configuration for the finance-platform monorepo.
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [monorepoRoot],
  resolver: {
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(monorepoRoot, 'node_modules'),
    ],
    disableHierarchicalLookup: true,
    /**
     * Resolve `@/` → `src/` at the Metro layer so aliases work even when
     * dependency collection runs before Babel rewrites imports.
     */
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName.startsWith('@/')) {
        const redirected = path.resolve(srcRoot, moduleName.slice(2));
        return context.resolveRequest(
          { ...context, resolveRequest: undefined },
          redirected,
          platform,
        );
      }

      return context.resolveRequest(
        { ...context, resolveRequest: undefined },
        moduleName,
        platform,
      );
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
