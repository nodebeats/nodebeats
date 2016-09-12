// Karma configuration
// Generated on Fri May 06 2016 12:40:46 GMT+0545 (NPT)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser

        files: [
            // Polyfills.
            'node_modules/core-js/client/shim.min.js',
            'node_modules/reflect-metadata/Reflect.js',
            // System.js for module loading

            'node_modules/systemjs/dist/system.src.js',
            'node_modules/systemjs/dist/system-polyfills.js',
            // Zone.js dependencies
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',
            // RxJs.
            {pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false},
            {pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false},

            //third party dependencies
            {pattern: 'node_modules/moment/**/*.js', included: false, watched: false},
            {pattern: 'node_modules/primeui/primeui-ng-all.min.js',included: true, watched: false},
            {pattern: 'node_modules/cloudinary-jquery/cloudinary-jquery.js', included: true, watched: false},
            {pattern: 'public/plugins/Chart.bundle.min.js', included: true, watched: false},
            {pattern: 'karma-test-shim.js', included: true, watched: true},
            {pattern: 'app-src/shared/test-helper/matchers.js', included: true, watched: true},
            // paths loaded via module imports

            // Angular itself
            {pattern: 'node_modules/@angular/**/*.js', included: false, watched: true},
            {pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: true},
            {pattern: 'node_modules/@angular2-material/**/*.js', included: false, watched: true},
            {pattern: 'node_modules/@angular2-material/**/*.js.map', included: false, watched: true},
            // Our built application code


            // {pattern: 'app-src/main.js', included: false, watched: true},
            {pattern: 'app-src/main.route.js', included: false, watched: true},
            {pattern: 'app-src/app-config/platform/**/*.js', included: false, watched: true},
            {pattern: 'app-src/app/login-app/**/*.js', included: false, watched: true},
            {pattern: 'app-src/app/admin-app/**/*.js', included: false, watched: true},
            {pattern: 'app-src/app/shared/**/*.js', included: false, watched: true},

            // paths loaded via Angular's component compiler
            // (these paths need to be rewritten, see proxies section)
            {pattern: 'app-src/app/login-app/**/*.html', included: false, watched: true},
            {pattern: 'app-src/app/admin-app/**/*.html', included: false, watched: true},
            {pattern: 'app-src/app/admin-app/**/*.css', included: false, watched: true},

            // paths to support debugging with source maps in dev tools
            {pattern: 'app-src/app/shared/**/*.ts', included: false, watched: true},
            {pattern: 'app-src/app/shared/**/*.js.map', included: false, watched: true},
            {pattern: 'app-src/app/admin-app/**/*.ts', included: false, watched: false},
            {pattern: 'app-src/app/admin-app/**/*.js.map', included: false, watched: false},
            {pattern: 'app-src/app/login-app/**/*.ts', included: false, watched: false},
            {pattern: 'app-src/app/login-app/**/*.js.map', included: false, watched: false}
        ],

        // proxied base paths
        proxies: {
            // required for component assests fetched by Angular's compiler
            "/app-src/": "/base/app-src/",
            "/login-templates/": "/base/app-src/app/login-app/views",
            "/admin-templates/": "/base/app-src/app/admin-app/views"
        },


        // list of files to exclude


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app-src/**/*.js': 'coverage'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        // reporters: ['progress', 'kjhtml', 'coverage'],
        reporters: ['mocha', 'kjhtml', 'coverage'],

        // coverageReporter: {
        //     type: 'html',
        //     dir: 'app-src/test-coverage/'
        // },
        mochaReporter: {},
        coverageReporter: {
            reporters: [
                {
                    type: 'html',
                    dir: 'app-src/test-coverage/'
                },
                {type: 'json', dir: 'app-src/test-coverage/', file: 'coverage-js.json'}
            ]
        },
        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // browsers: ['Chrome'],
        browsers: ['PhantomJS'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        /* // Concurrency level
         // how many browser should be started simultaneous*/
        //      concurrency: Infinity,
        plugins: [
            // 'karma-jasmine',
            // 'karma-chrome-launcher',
            // 'karma-jasmine-html-reporter',
            // 'karma-coverage'
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('karma-coverage'),
            require('karma-mocha-reporter'),
            require('karma-super-dots-reporter'),
            require('karma-jasmine-html-reporter')
        ]

    })

};
