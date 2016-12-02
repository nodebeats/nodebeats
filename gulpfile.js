(function () {
    "use strict";

    var gulp = require("gulp"),
        nodemon = require("gulp-nodemon"),
        browserSync = require("browser-sync"),
        env = require('gulp-env'),
        jshint = require('gulp-jshint'),
        gulpMocha = require('gulp-mocha'),
        gutil = require('gutil'),
        util = require('gulp-util'),
        istanbul = require('gulp-istanbul'),
        serverWatchFiles = [
            'server.js',
            'cluster.js',
            'app.js',
            'lib/auth/**/*.js',
            'lib/configs/**/*.js',
            'lib/controllers/**/*.js',
            'lib/data/**/*.js',
            'lib/handlers/**/*.js',
            'lib/helpers/**/*.js',
            'lib/middlewares/**/*.js',
            'lib/models/**/*.js',
            'lib/routes/**/*.js',
            'lib/views/**/*.hbs',
            'lib/securityconfigs/**/*.js'
        ],
        clientWatchFiles = [
            'lib/views/**/*.*',
            'public/**/*.css',
            'adminapp/**/*.js'
        ],
        typescript = require('gulp-typescript'),
        sourcemaps = require('gulp-sourcemaps');
// Get tasks from gulp-tasks directory
    require('require-dir')('gulp-tasks');


    gulp.task("default", ["nodemon"], function () {
        //gulp.start("watch:clientFiles");
        // gulp.start("watch:js");
        // gulp.start('test');
        //gulp.start("watch:ts");
        // gulp.start("compile-ts");

    });
    //var tsProject = typescript.createProject('tsconfig.json');
    // gulp.task("compile-ts", function () {
    //     return tsProject.src("app/**/*.ts")
    //         .pipe(sourcemaps.init())
    //         .pipe(typescript(
    //             tsProject
    //         ))
    //         .pipe(sourcemaps.write('app/maps', {includeContent: false}))
    //         .pipe(gulp.dest('app/build'));
    // });
    gulp.task("copy-html", function () {
        return gulp.src(['app/**/**.html', 'app/**/**.css'])
            .pipe(gulp.dest('app/build'));
    });

    // gulp.task('compile-ts', function(){
    //        gulp.src('/adminapp/**/*.ts')
    //            .pipe(typescript(n))
    //            .pipe(gulp.dest('adminapp/'));
    //    });
    gulp.task("browser-sync", function () {
        browserSync({
            proxy: "http://localhost:3000",
            files: clientWatchFiles,
            port: 7000,
            browser: ["google-chrome"]
        });
    });

    gulp.task('nodemon', function (cb) {
        var called = false;
        return nodemon({
            // nodemon our expressjs server
            script: 'cluster.js',
            ignore: [
                'gulpfile.js',
                'node_modules/**',
                'public/uploads/**',
                'public/lib/**'
            ],
            // watch core server file(s) that require server restart on change
            watch: serverWatchFiles
        })
            .on('start', function onStart() {
                // ensure start only got called once
                if (!called) {
                    cb();
                    called = true;
                }

            })
            .on('restart', function onRestart() {
                browserSync.reload();
            });
    });


    gulp.task("watch:clientFiles", function () {
        browserSync.watch(clientWatchFiles).on('change', function () {
            browserSync.reload();
        });
    });
    gulp.task("watch:js", function () {
        browserSync.watch('public/js/*.js').on('change', function () {
            browserSync.reload();
        });
    });
    // gulp.task("watch:ts", function () {
    //     gulp.watch('adminapp/**/*.ts', ['compile-ts']);
    //     browserSync.watch('adminapp/**/*.ts').on('change', function () {
    //         browserSync.reload();
    //     });
    //
    // });
    gulp.task('lint', function () {
        gulp.src('./**/*.js')
            .pipe(jshint());
    });
    // gulp.task('test', ['pre-test'], function(){
    gulp.task('test', function () {
        env({
            vars: {
                ENV: 'Test'
            }
        });
        return gulp.src('./test/index.js', {read: false})
            .pipe(gulpMocha({reporter: 'spec'}))
            // Creating the reports after tests ran
            .pipe(istanbul.writeReports({
                dir: './public/assets/coverage',
                reporters: ['lcov'],
                reportOpts: {dir: './public/assets/coverage'}
            }))
            // Enforce a coverage of at least 90%
            .pipe(istanbul.enforceThresholds({thresholds: {global: 70}}))
            .on('error', util.log, function () {

                process.exit(1);
            })
            .once('end', function () {
                process.exit();
            });

    });


    gulp.task('unit_test', function () {
        env({
            vars: {
                ENV: 'Test'
            }
        });
        return gulp.src('./test/unittests/*.js', {read: false})
            .pipe(gulpMocha({reporter: 'spec'}))

            // Creating the reports after tests ran
            .pipe(istanbul.writeReports({
                dir: './assets/coverage',
                reporters: ['lcov'],
                reportOpts: {dir: './assets/coverage'}
            }))
            // Enforce a coverage of at least 90%
            .pipe(istanbul.enforceThresholds({thresholds: {global: 90}}))
            .on('error', util.log, function () {

                process.exit(1);
            })
            .once('end', function () {
                process.exit();
            });

    });

    gulp.task('pre-test', function () {
        // This tells gulp which files you want to pipe
        // In our case we want to pipe every `.js` file inside any folders inside `test`
        return gulp.src('test/integrationtests/*.js')
            .pipe(istanbul())
            // This overwrites `require` so it returns covered files
            .pipe(istanbul.hookRequire());
    });
})();

