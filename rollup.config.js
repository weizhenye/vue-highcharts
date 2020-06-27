import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const outputOption = {
  name: 'VueHighcharts',
  globals: { vue: 'Vue' },
  exports: 'named',
  format: 'umd',
};

export default {
  input: 'index.js',
  output: [
    {
      ...outputOption,
      file: 'dist/vue-highcharts.js',
    },
    {
      ...outputOption,
      file: 'dist/vue-highcharts.min.js',
      plugins: [terser()],
    },
  ],
  external: ['vue'],
  plugins: [
    babel({ babelHelpers: 'bundled' }),
  ],
};
