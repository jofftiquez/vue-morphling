// Babel is only used by Jest to run the ESM sources on Node.
// The library build (rollup) ships the sources untranspiled.
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
};
