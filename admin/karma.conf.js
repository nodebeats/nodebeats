// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'angular-cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-super-dots-reporter'),
      require('karma-mocha-reporter'),
      require('karma-phantomjs-launcher'),
      require('karma-remap-istanbul'),
      require('angular-cli/plugins/karma')
    ],
    files: [
      { pattern: './src/test.ts', watched: false },
      {pattern: 'node_modules/moment/**/*.js', included: false, watched: false},
      {pattern: 'node_modules/primeui/primeui-ng-all.min.js',included: true, watched: false},
      {pattern: 'node_modules/primeng/**/*.js',included: false, watched: false},
      {pattern: 'node_modules/cloudinary-jquery/cloudinary-jquery.js', included: true, watched: false},
      {pattern: 'src/assets/plugins/Chart.bundle.js', included: true, watched: false},
      {pattern: 'src/assets/plugins/table-sorter.js', included: true, watched: false},

    ],
    preprocessors: {
      './src/test.ts': ['angular-cli']
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },

    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['mocha','dots','coverage']
              : ['mocha','dots','coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
