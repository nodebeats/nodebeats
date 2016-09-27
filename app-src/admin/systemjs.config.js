(function (global) {

    // map tells the System loader where to look for things
    var paths = {
        // paths serve as alias
        'npm:': 'scripts/'
    };
    var map = {
        'app': 'app-src',
        // 'admin-app': 'admin-app', // 'dist',
        'rxjs': 'scripts/rxjs',
        'angular2-in-memory-web-api': 'scripts/angular2-in-memory-web-api',
        '@angular': 'scripts/@angular',
        'moment': 'scripts/moment/moment.js',
        // 'cloudinary': 'lib/cloudinary/js/jquery.cloudinary.js',
        'jquery': 'scripts/jquery/dist/jquery.min.js',
        'primeng': 'scripts/primeng',
        'chart': 'plugins/Chart.bundle.min.js',
        'ng2-bootstrap': 'shared/components/ng2-bootstrap',
        '@angular2-material': 'scripts/@angular2-material',
        'symbol-observable': 'scripts/symbol-observable',
        'public': ''
        // 'fuel-ui': 'plugins/fuel-ui/bundles/ng2-bootstrap.js'

    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {main: 'main.js', defaultExtension: 'js'},
        // 'admin-app': {main: 'main.js', defaultExtension: 'js'},
        'rxjs': {defaultExtension: 'js'},
        'angular2-in-memory-web-api': {defaultExtension: 'js'},
        'admin-app': {
            defaultExtension: 'js'
        },
        '@angular': {
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
        'config': {
            defaultExtension: 'js'
        },
        'primeng': {
            defaultExtension: 'js'
        },
        'ng2-bootstrap': {
            defaultExtension: 'js'
        },
        'public': {
            defaultExtension: 'js'
        },
        '@angular2-material/core': {
            format: 'cjs',
            main: 'core.umd.js'
        }
    };

    //
    var packageNames = [
        'common',
        'compiler',
        'core',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'forms'
    ];
    //
    // // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = {main: '/bundles/' + pkgName + '.umd.min.js', defaultExtension: 'js'}
    }

    mdPackagesName =
        [
            'all',
            'slide-toggle'
        ];
    function mdPackUmd(pkgName) {
        packages['@angular2-material/' + pkgName] = {main: '/' + pkgName + '.umd.js', defaultExtension: 'js'}

    }


    packageNames.forEach(packUmd);
    mdPackagesName.forEach(mdPackUmd);
    var config = {
        paths: paths,
        map: map,
        packages: packages
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    // if (global.filterSystemConfig) {
    //     global.filterSystemConfig(config);
    // }

    System.config(config);

})(this);