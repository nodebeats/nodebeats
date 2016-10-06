/*global jasmine, __karma__, window*/
Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;

__karma__.loaded = function () {
};


function isJsFile(path) {
    return path.slice(-3) == '.js';
}

function isSpecFile(path) {
    return path.slice(-8) == '.test.js';
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
    { paths: {
        // paths serve as alias
        'npm:': 'node_modules/'
    },
        map: {
            'rxjs': 'node_modules/rxjs',
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/router/testing': 'npm:@angular/router/bundles/router-testing.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular2-material/slide-toggle': 'npm:@angular2-material/slide-toggle/slide-toggle.umd.js',
            '@angular2-material/checkbox': 'npm:@angular2-material/checkbox/checkbox.umd.js',
            '@angular2-material/button': 'npm:@angular2-material/button/button.umd.js',
            '@angular2-material/core': 'npm:@angular2-material/core/core.umd.js',

            // angular testing umd bundles
            '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
            '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
            '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
            '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
            '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',

            'app-src': 'app-src',
            'cloudinary': 'public/cloudinary/js/jquery.cloudinary.js',
            'primeng': 'npm:primeng',
            'ng2-bootstrap': 'app-src/admin/app/shared/components/ng2-bootstrap',
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
                main:"primeng.js",
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

    testing.TestBed.initTestEnvironment(testingBrowser.BrowserDynamicTestingModule,
        testingBrowser.platformBrowserDynamicTesting());

}).then(function() {
    // Finally, load all spec files.
    // This will run the tests directly.
    return Promise.all(
        allSpecFiles.map(function (moduleName) {
            return System.import(moduleName);
        }));
}).then(__karma__.start, __karma__.error);

