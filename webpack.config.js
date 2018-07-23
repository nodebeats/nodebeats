var path = require('path');
var appRootPath = __dirname + "/client";
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var Debug = process.env.NODE_ENV != "production";
module.exports = {
    entry: {
        main: appRootPath + '/vendor-scripts',
        css: appRootPath + '/vendor-css'
    },

    output: {
        path: path.join(__dirname, 'public/package/'),
        filename: '[name].bundle.js'
   },
    module: {
        loaders: [

            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'file?name=assets/[hash].[ext]'
            },
            // {
            //     test: /\.(eot|svg|ttf|woff|woff2)$/,
            //     loader: 'file?name=assets/fonts/[name].[ext]'
            // },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=assets/[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }

        ]
    },
    debug: Debug,
    devtool: Debug ? "cheap-module-source-map" : false,
    resolve: {

        /*
         * An array of extensions that should be used to resolve modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions: ['', '.js', '.css'],

        // Make sure root is src
        root: appRootPath,

        // remove other default values
        modulesDirectories: ['node_modules'],
        alias: {
            'offline': __dirname + '/public/offline',
            'public': __dirname + '/public',
            'scripts': __dirname + '/node_modules/',
            'scrollreveal': __dirname + '/public/plugins/scrollreveal/scrollreveal.js',
            'client': __dirname + '/client'

        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': "jquery",
            "ScrollReveal": "scrollreveal"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main'].reverse()
        }),
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
        /**
         * Plugin: DedupePlugin
         * Description: Prevents the inclusion of duplicate code into your bundle
         * and instead applies a copy of the function at runtime.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
         * See: https://github.com/webpack/docs/wiki/optimization#deduplication
         */
        new DedupePlugin(),

        /**
         * Plugin: UglifyJsPlugin
         * Description: Minimize all JavaScript output of chunks.
         * Loaders are switched into minimizing mode.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
         */
        // NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
        new UglifyJsPlugin({
            warnings: false,
            beautify: false, //prod
            mangle: {screw_ie8: true}, //prod
            compress: {screw_ie8: true}, //prod
            comments: false //prod
        })
    ]

};
