/**
 * @author: @AngularClass
 */

const webpack = require('webpack');
const helpers = require('./helpers');
const path = require('path');
/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/*
 * Webpack Constants
 */
const METADATA = {
    title: 'Nodebeat',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */

/* Configuring Root for App */
const appRootPath = helpers.root('app-src/admin');

module.exports = {

    /*
     * Static metadata for index.html
     *
     * See: (custom attribute)
     */
    metadata: METADATA,

    /*
     * Cache generated modules and chunks to improve performance for multiple incremental builds.
     * This is enabled by default in watch mode.
     * You can pass false to disable it.
     *
     * See: http://webpack.github.io/docs/configuration.html#cache
     */
    //cache: false,

    /*
     * The entry point for the bundle
     * Our Angular.js app
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: {

        'polyfills': appRootPath + '/app-config/polyfills.browser',
        'vendor': appRootPath + '/app-config/vendor.browser',
        'main': appRootPath + '/main',
        'commoncss': appRootPath + '/app-config/commoncss'
    },

    /*
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

        /*
         * An array of extensions that should be used to resolve modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions: ['', '.js', '.json', '.css'],

        // Make sure root is src
        root: appRootPath,

        // remove other default values
        //  modulesDirectories: ['node_modules'],
        alias: {
            'primeng': appRootPath + '/app/shared/components/primeng',
            'chart': appRootPath + '/plugins/Chart.bundle.min.js',
            'ng2-bootstrap': appRootPath + '/app/shared/components/ng2-bootstrap',
            'plugins': helpers.root('public/plugins'),
            'admin-templates': appRootPath + '/app/admin-app/views',
            'public': helpers.root('public'),
            'scripts': helpers.root('node_modules'),
            'cloudinary': helpers.root('node_modules/cloudinary-jquery/cloudinary-jquery.js')
        }
    },

    /*
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

        /*
         * An array of applied pre and post loaders.
         *
         * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
         */
        preLoaders: [

            /*
             * Tslint loader support for *.ts files
             *
             * See: https://github.com/wbuchwalter/tslint-loader
             */
            // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },

            /*
             * Source map loader support for *.js files
             * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
             *
             * See: https://github.com/webpack/source-map-loader
             */
            // {
            //     test: /\.js$/,
            //     loader: 'source-map-loader',
            //     exclude: [
            //         // these packages have problems with their sourcemaps
            //         helpers.root('node_modules/rxjs'),
            //         helpers.root('node_modules/@angular'),
            //         helpers.root('node_modules/@angular2-material')
            //     ]
            // }

        ],

        /*
         * An array of automatically applied loaders.
         *
         * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
         * This means they are not resolved relative to the configuration file.
         *
         * See: http://webpack.github.io/docs/configuration.html#module-loaders
         */
        loaders: [

            /*
             * Typescript loader support for .ts and Angular 2 async routes via .async.ts
             *
             * See: https://github.com/s-panferov/awesome-typescript-loader
             */
            // {
            //   test: /\.ts$/,
            //   loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
            //   exclude: [/\.(spec|e2e)\.ts$/]
            // },

            /*
             * Json loader support for *.json files.
             *
             * See: https://github.com/webpack/json-loader
             */
            {
                test: /\.json$/,
                loader: 'json-loader'
            },

            /*
             * to string and css loader support for *.css files
             * Returns file content as string
             *
             */
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?hash=sha512&digest=hex&name=assets/[hash].[ext]'
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'file?hash=sha512&digest=hex&name=assets/[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: appRootPath + '/admin',
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.css$/,
                include: appRootPath + '/admin',
                loaders: 'raw'
            },
            /* Raw loader support for *.html
             * Returns file content as string
             *
             * See: https://github.com/webpack/raw-loader
             */
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [appRootPath + '/app/admin-app/views/admin-layout.html',
                    appRootPath + '/login-app/views/login-layout.html'
                ]
            }

        ]

    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "jquery": "jQuery"
    }
    ,
    /*
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [

        new webpack.ProvidePlugin({
            "cloudinary": "cloudinary",
            "window.Tether": 'tether'
        }),
        /*
         * Plugin: ForkCheckerPlugin
         * Description: Do type checking in a separate process, so webpack don't need to wait.
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
         */
        // new ForkCheckerPlugin(),

        /*
         * Plugin: OccurenceOrderPlugin
         * Description: Varies the distribution of the ids to get the smallest id length
         * for often used ids.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
         * See: https://github.com/webpack/docs/wiki/optimization#minimize
         */

        new webpack.optimize.OccurenceOrderPlugin(true),

        /*
         * Plugin: CommonsChunkPlugin
         * Description: Shares common code between the pages.
         * It identifies common modules and put them into a commons chunk.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
         * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: ['polyfills', 'vendor', 'main'/*, 'helperscript'*/].reverse()
        }),

        /*
         * Plugin: CopyWebpackPlugin
         * Description: Copy files and directories in webpack.
         *
         * Copies project static assets.
         *
         * See: https://www.npmjs.com/package/copy-webpack-plugin
         */
        new CopyWebpackPlugin([{
            from: appRootPath + '/app/admin-app/views',
            to: 'views'
        },
            {
                from: appRootPath + '/app/login-app/views',
                to: 'views'
            },
            {
                from: appRootPath + '/app/login-app/login-index.html'

            },
            {
                from: appRootPath + '/app/admin-app/admin-index.html'

            },
            {
                from: appRootPath + '/app/app.html'
            },
            {
                from: appRootPath + '/inlineScripts.js'
            }
        ]),

        /*Single Css */
        new ExtractTextPlugin("style.css", {
            allChunks: true
        }),
        /*
         * Plugin: HtmlWebpackPlugin
         * Description: Simplifies creation of HTML files to serve your webpack bundles.
         * This is especially useful for webpack bundles that include a hash in the filename
         * which changes every compilation.
         *
         * See: https://github.com/ampedandwired/html-webpack-plugin
         */
        new HtmlWebpackPlugin({
            template: appRootPath + '/app-config/index.html',
            chunksSortMode: 'dependency',
            excludeChunks: ['main', "vendor", "polyfills", "commoncss"]
        }),

        /*
         * Plugin: HtmlHeadConfigPlugin
         * Description: Generate html tags based on javascript maps.
         *
         * If a publicPath is set in the webpack output configuration, it will be automatically added to
         * href attributes, you can disable that by adding a "=href": false property.
         * You can also enable it to other attribute by settings "=attName": true.
         *
         * The configuration supplied is map between a location (key) and an element definition object (value)
         * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
         *
         * Example:
         *  Adding this plugin configuration
         *  new HtmlElementsPlugin({
         *    headTags: { ... }
         *  })
         *
         *  Means we can use it in the template like this:
         *  <%= webpackConfig.htmlElements.headTags %>
         *
         * Dependencies: HtmlWebpackPlugin
         */
        new HtmlElementsPlugin({
            headTags: require('./head-config.common')
        })

    ],
    resolveLoader: {
        // alias: {
        //     'json-loader': 'json-loader/index.js'
        //     // 'fuel-ui/fuel-ui': 'public/plugins/fuel-ui/fuel-ui'
        // },
        // modulesDirectories: ['node_modules'],
        // extensions: ['', '.json', '.js'],
        packageMains: ['json-loader']
    }
    ,
    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
        global: 'window',
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false,
        fs: "empty",
        net: 'empty'
    }

}
;
