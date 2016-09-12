(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'app': 'app-src',
        // 'admin-app': 'admin-app', // 'dist',
        'rxjs': 'scripts/rxjs',
        'angular2-in-memory-web-api': 'scripts/angular2-in-memory-web-api',
        '@angular': 'scripts/@angular',
        'moment': 'scripts/moment/moment.js',
        'cloudinary': 'scripts/cloudinary-jquery/cloudinary-jquery.js',
        'jquery': 'scripts/jquery/dist/jquery.min.js',
        'primeng': 'shared/components/primeng',
        'chart': 'plugins/Chart.bundle.min.js',
        'ng2-bootstrap': 'shared/components/ng2-bootstrap',
        '@angular2-material': 'scripts/@angular2-material',
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
            defaultExtension: 'js',
        },
        'ng2-bootstrap': {
            defaultExtension: 'js'
        },
        '@vaadin/angular2-polymer': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        '@angular2-material': {
            defaultExtension: 'js'

        },
        'public': {
            defaultExtension: 'js'
        }

        // 'fuel-ui/fuel-ui': {
        //     main: 'fuel-ui.min.js',
        //     defaultExtension: 'js'
        //
        //  }


        //  'moment':{main:'moment.js',defaultExtension: 'js'},

    };

    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/router-deprecated',
        '@angular/testing',
        '@angular/upgrade',
        '@angular/forms'
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function (pkgName) {
        packages[pkgName] = {main: 'index.js', defaultExtension: 'js'};
    });

    var config = {
        map: map,
        packages: packages
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    // if (global.filterSystemConfig) {
    //     global.filterSystemConfig(config);
    // }

    System.config(config);

})(this);