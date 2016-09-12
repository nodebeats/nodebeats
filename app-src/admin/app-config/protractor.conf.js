/**
 * @author: @AngularClass
 */
    // Common configuration files with defaults plus overrides from environment vars
var webServerDefaultPort = 3000;
require('ts-node/register');
var helpers = require('./helpers');

exports.config = {
    // A base URL for your application under test.
    baseUrl:
    'http://' + (process.env.HTTP_HOST || 'localhost') +
    ':' + (process.env.HTTP_PORT || webServerDefaultPort),
  //  baseUrl: 'http://localhost:3000/',
    //seleniumAddress: (process.env.SELENIUM_URL || 'http://localhost:4444/wd/hub'),
    // use `npm run e2e`
    specs: [
        helpers.root('app-src/app/**/**.e2e.ts'),
        helpers.root('app-src/app/**/*.e2e.ts')
    ],
  //  exclude: [],

    framework: 'jasmine',

  //  allScriptsTimeout: 110000,

    // jasmineNodeOpts: {
    //     showTiming: true,
    //     showColors: true,
    //     isVerbose: false,
    //     includeStackTrace: false,
    //     defaultTimeoutInterval: 400000
    // },
    // directConnect: true,

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['show-fps-counter=true']
        }
    },

    // onPrepare: function () {
    //     browser.ignoreSynchronization = true;
    // },
    // Default http port to host the web server
    webServerDefaultPort: webServerDefaultPort,

    // Protractor interactive tests
    interactiveTestPort: 6969,

    /**
     * Angular 2 configuration
     *
     * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
     * `rootEl`
     */
    useAllAngular2AppRoots: true
};
