import { readFileSync } from 'node:fs';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));
const deps = Object.keys(pkg.dependencies || {});
const external = id => deps.some(dep => id === dep || id.startsWith(`${dep}/`));
const banner = `/*! ${pkg.name} v${pkg.version} | ${pkg.license} */`;

export default [
  // Bundler / Node builds: runtime dependencies stay external.
  {
    input: 'src/index.js',
    external,
    output: [
      { file: 'dist/vue-morphling.mjs', format: 'es', banner },
      { file: 'dist/vue-morphling.cjs', format: 'cjs', exports: 'named', banner }
    ],
    plugins: [resolve()]
  },
  // <script> build: everything bundled and minified, exposed as `window.VueMorphling`.
  {
    input: 'src/index.js',
    output: { file: 'dist/vue-morphling.js', format: 'umd', name: 'VueMorphling', exports: 'named', banner },
    plugins: [resolve({ browser: true }), commonjs(), terser()]
  }
];
