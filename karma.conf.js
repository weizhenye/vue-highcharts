const istanbul = require('rollup-plugin-istanbul');

module.exports = (config) => {
  config.set({
    singleRun: true,
    frameworks: ['mocha', 'chai'],
    browsers: ['ChromeHeadless'],
    files: [
      'node_modules/vue/dist/vue.min.js',
      'node_modules/highcharts/highcharts.js',
      'node_modules/highcharts/modules/stock.js',
      'node_modules/highcharts/modules/map.js',
      'node_modules/highcharts/modules/gantt.js',
      'test/test.js',
    ],
    preprocessors: {
      'test/test.js': ['rollup'],
    },
    rollupPreprocessor: {
      format: 'iife',
      globals: {
        highcharts: 'Highcharts',
        vue: 'Vue',
      },
      plugins: [
        istanbul({ exclude: ['test/**/*.js'] }),
      ],
    },
    reporters: ['dots', 'coverage'],
    coverageReporter: {
      type: 'lcov',
      subdir: '.',
    },
  });
};
