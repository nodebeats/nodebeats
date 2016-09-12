/*global jasmine, __karma__, window*/
Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;

__karma__.loaded = function () {
};


function isJsFile(path) {
    return path.slice(-3) == '.js';
}

function isSpecFile(path) {
    return path.slice(-8) == '-spec.js';
}

function isBuiltFile(path) {
    var builtPath = '/base/app-src/';
    return isJsFile(path) && (path.substr(0, builtPath.length) == builtPath);
}

var allSpecFiles = Object.keys(window.__karma__.files)
    .filter(isSpecFile)
    .filter(isBuiltFile);

// Load our SystemJS configuration.
System.config({
    baseURL: '/base'
});

System.config(
    {
        map: {
            'rxjs': 'node_modules/rxjs',
            '@angular': 'node_modules/@angular',
            'app-src': 'app-src',
            'cloudinary': 'public/cloudinary/js/jquery.cloudinary.js',
            'primeng': 'app-src/app/shared/components/primeng',
            'ng2-bootstrap': 'app-src/app/shared/components/ng2-bootstrap',
            '@angular2-material': 'node_modules/@angular2-material',
            'moment': 'node_modules/moment/moment.js',
            'plugins': 'public/plugins',
            'public': ''
        },
        packages: {
            'app-src': {
                main: 'main.js',
                defaultExtension: 'js'
            },
            '@angular/core': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/compiler': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/common': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/http': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/platform-browser': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/platform-browser-dynamic': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/forms': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/router': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            'rxjs': {
                defaultExtension: 'js'
            },
            'admin-app': {
                defaultExtension: 'js'
            },
            'admin-app/components': {
                defaultExtension: 'js'
            },
            'login-app': {
                defaultExtension: 'js'
            },
            'login-app/components': {
                defaultExtension: 'js'
            },
            'shared': {
                defaultExtension: 'js'
            },
            'primeng': {
                defaultExtension: 'js'
            },
            'ng2-bootstrap': {
                defaultExtension: 'js'
            },
            '@angular2-material': {
                defaultExtension: 'js'

            },
            'public': {
                defaultExtension: 'js'
            }
        }
    });

Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing')
]).then(function (providers) {
    var testing = providers[0];
    var testingBrowser = providers[1];

    testing.setBaseTestProviders(testingBrowser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
        testingBrowser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

}).then(function () {
    // Finally, load all spec files.
    // This will run the tests directly.
    return Promise.all(
        allSpecFiles.map(function (moduleName) {
            return System.import(moduleName);
        }));
}).then(__karma__.start, __karma__.error);


// /* global System */
// /* global __karma__ */
// /* global System */
// /* global __karma__ */
//
// // Cancel Karma's synchronous start,
// // we will call `__karma__.start()` later, once all the specs are loaded.
// __karma__.loaded = function () {
// };
//
// // Set the base url of our scripts
// System.baseURL = "/base";
//
// // Here we set all the preffixes so that we'll
// // be able for example to import 'test/test_name'
// // instead of 'scripts/build/test_name'
// System.paths = {
//     // 'app/*': 'app/admin-app/**/*.js',
//     'app/admin-app/component/*': '/base/app/admin-app/**/*.js',
//     'angular2/*': 'angular2/*',
//     'rx': 'rx'
// };
//
// // paths that include spec and ends with .js
// function onlySpecFiles(path) {
//     return /spec\.js$/.test(path);
// }
//
// // takes paths and normalize them to module names
// // by removing a base url preffix and .js suffix
// function karmaFileToModule(fileName) {
//     return fileName.replace(System.baseURL, '')
//         .replace('.js', '');
// }
// Promise.all(
//     Object.keys(window.__karma__.files) // Takes all files that served by karma
//         .filter(onlySpecFiles)  // choose only test files
//         .map(karmaFileToModule) // normalize them to module names
//         .map(function (moduleName) {
//             return System.import(moduleName) // import each module
//                 .then(function (module) {
//                     if (module.hasOwnProperty('main')) {
//                         console.log(module)
//                         module.main(); //expose the tests
//                     } else {
//                         throw new Error('Module ' + moduleName + ' does not implement main() method.');
//                     }
//                 });
//         })).then(function () {
//     __karma__.start(); // after all tests were exposed
// }, function (error) {
//     console.error(error.stack || error);
//     __karma__.start();
// });


// Tun on full stack traces in errors to help debugging
// Error.stackTraceLimit = Infinity;
//
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
//
// // // Cancel Karma's synchronous start,
// // // we will call `__karma__.start()` later, once all the specs are loaded.
// __karma__.loaded = function() {};
//
// System.config({
//     packages: {
//         'base/app/admin-app': {
//             defaultExtension: 'js',
//             map: Object.keys(window.__karma__.files).filter(onlyAppFiles).reduce(createPathRecords, {})
//         }
//     }
// });
//
// System.import('angular2/src/platform/browser/browser_adapter')
//     .then(function(browser_adapter) { browser_adapter.BrowserDomAdapter.makeCurrent(); })
//     .then(function() { return Promise.all(resolveTestFiles()); })
//     .then(function() { __karma__.start(); },
//         function(error) { console.log(error) });
//
// function createPathRecords(pathsMapping, appPath) {
//     // creates local module name mapping to global path with karma's fingerprint in path, e.g.:
//     // './vg-player/vg-player':
//     // '/base/dist/vg-player/vg-player.js?f4523daf879cfb7310ef6242682ccf10b2041b3e'
//     var pathParts = appPath.split('/');
//     var moduleName = './' + pathParts.slice(Math.max(pathParts.length - 2, 1)).join('/');
//     moduleName = moduleName.replace(/\.js$/, '');
//     pathsMapping[moduleName] = appPath + '?' + window.__karma__.files[appPath];
//     return pathsMapping;
// }
//
// function onlyAppFiles(filePath) {
//     return /\/base\/app\/admin-app\/\/(?!.*\spec\.js$).*\.js$/.test(filePath);
//
// }
//
// function onlySpecFiles(path) {
//     return /\-spec\.js$/.test(path);
// }
//
// function resolveTestFiles() {
//     return Object.keys(window.__karma__.files)  // All files served by Karma.
//         .filter(onlySpecFiles)
//         .map(function(moduleName) {
//             // loads all spec files via their global module names (e.g.
//             // 'base/dist/vg-player/vg-player.spec')
//             return System.import(moduleName);
//         });
// }
