import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import pkg from './package.json';

const GLOBAL_NAME = 'CapturooClient';

const plugins = [
  resolve(),
  commonjs(),
  replace({
    'CAPTUROO_VERSION': JSON.stringify(pkg.version) 
  })
];

const builds = [
  {
    treeshake: false,
    input: 'src/index.js',
    output: [
      {
        file: pkg.browser,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins
  },
  {
    treeshake: false,
    input: 'src/index.js',
    output: [
      {
        file: `dist/capturoo-sdk-${pkg.version}.js`,
        format: 'umd',
        name: GLOBAL_NAME
      },
      {
        file: 'public/capturoo-sdk.js',
        format: 'umd',
        name: GLOBAL_NAME
      }
    ],
    plugins
  },
  {
    treeshake: false,
    input: 'src/index.js',
    output: {
      file: `dist/capturoo-sdk-${pkg.version}-min.js`,
      format: 'umd',
      name: 'capturoo'
    },
    plugins: [...plugins, uglify()]
  }
];

export default [...builds];
