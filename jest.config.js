module.exports = {
  testEnvironment: 'jsdom',
  // Resolve `vue` to its Node (CJS) build, which bundles the template compiler.
  testEnvironmentOptions: { customExportConditions: ['node', 'node-addons'] }
};
