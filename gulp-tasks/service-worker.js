/**
 *
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var swPrecache = require('sw-precache');

// This is used as the cacheID, worth only reading the file once.
global.config = {
    env: 'prod',
    port: 3000,
    src: 'src',
    dest: 'public',
    offlineRoot: 'public',
    appRoot: '/'
};

gulp.task('service-worker:watch', function () {
    gulp.watch(global.config.offlineRoot + '/**/*.*', ['service-worker']);
    gulp.watch(global.config.offlineRoot + '/../views/**/*.*',
        ['service-worker']);
});

gulp.task('service-worker', ['clean:sw'], function (cb) {
    swPrecache.write(path.join(global.config.offlineRoot, 'sw.js'), {
        staticFileGlobs: [
            global.config.offlineRoot + '/offline/**/*.{js,html,css,png,jpg,jpeg,gif,svg,ttf,woff,woff2}',
            global.config.offlineRoot + '/manifest.json'
        ],
        dynamicUrlToDependencies: {
            '/app-shell': ['lib/views/layouts/app-shell.hbs'],
            '/': [
                'lib/views/layouts/main-layout.hbs',
                'lib/views/index.hbs',
                'lib/views/partials/team.hbs',
                'lib/views/partials/technology-stack.hbs'
            ]
        },
        runtimeCaching: [

            {
                // See https://github.com/GoogleChrome/sw-toolbox#methods
                urlPattern: /^\/(?!login|admin)/,
                handler: 'networkOnly'
            },
            {
                urlPattern: /\/\/res.cloudinary.com\//,
                handler: 'networkFirst',
                options: {
                    cache: {
                        maxEntries: 16,
                        name: 'image-cache'
                    }
                }
            },
            {
                urlPattern: /^\/(?!getting-started|doc\/api)/,
                handler: 'networkOnly'
            }

        ],

        stripPrefix: global.config.offlineRoot,
        stripPrefixMulti: {
            "node_modules/": 'scripts/'
        },
        navigateFallback: '/app-shell',
        navigateFallbackWhitelist: [/^\/(?!.)/],
        cacheId: "nodebeats",
        //   importScripts: ['scripts/sw-toolbox/sw-toolbox.js'],
        verbose: true,
        maximumFileSizeToCacheInBytes: 3097152, //3mb
        handleFetch: true//(global.config.env === 'prod')
    })
        .then(cb)
        .catch(function () {
            cb();
        });
});
