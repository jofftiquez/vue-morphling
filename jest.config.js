// Pin the time zone so date tests are deterministic. America/New_York (west of
// UTC) is where UTC-vs-local date bugs show up. Workers inherit this.
process.env.TZ = 'America/New_York';

module.exports = {
  testEnvironment: 'jsdom',
  // Resolve `vue` to its Node (CJS) build, which bundles the template compiler.
  testEnvironmentOptions: { customExportConditions: ['node', 'node-addons'] }
};
