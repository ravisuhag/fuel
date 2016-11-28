'use strict';
const path = require('path');
const Gulp = require('gulp');
const Gutil = require('gulp-util');
const Webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");

var webpackConfig = {
    entry: {
        vendor: ['jquery'],
        app: './app/index.js'
    },
    output: {
        path: path.join(__dirname, '../', 'build/js/'),
        publicPath: 'build/',
        filename: '[name].bundle.js'
    },
    cache: true,
    debug: false,
    devtool: 'cheap-module-source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            query: { compact: false },
            exclude: /(node_modules|bower_components)/
        }]
    },
    plugins: [
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: 2
        })
    ]
};

// Webpack production build
Gulp.task('webpack:build', function() {

    var prodConfig = Object.create(webpackConfig);

    prodConfig.plugins = prodConfig.plugins.concat(
        new Webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react and other lib size
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new Webpack.optimize.DedupePlugin(),
        new Webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );

    Webpack(prodConfig, function(err, stats) {

        if (err) {
            throw new Gutil.PluginError('webpack', err);
        }
        Gutil.log('[webpack]', stats.toString({
            colors: true
        }));
    });
});


Gulp.task('webpack:dev-build', function() {

    // Set dev config for webpack
    var devConfig = Object.create(webpackConfig);
    devConfig.devtool = 'sourcemap';
    devConfig.debug = true;

    // Create a single instance of the compiler to allow caching
    var devCompiler = Webpack(devConfig);

    devCompiler.watch({}, function(err, stats) {
        if (err) {
            throw new Gutil.PluginError('webpack', err);
        }
        Gutil.log('[webpack:build-dev]', stats.toString({
            colors: true,
            chunks: false
        }));
    });
});

Gulp.task("webpack:dev-server", function(callback) {

    // Set dev server config for webpack
    var devServerConfig = Object.create(webpackConfig);
    devServerConfig.devtool = 'sourcemap';
    devServerConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(Webpack(devServerConfig), {
        publicPath: "/" + devServerConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    }).listen(8000, 'localhost', function(err) {
        if(err) {
            throw new Gutil.PluginError("webpack-dev-server", err);
        }
        Gutil.log('[webpack-dev-server]', 'http://localhost:8000/webpack-dev-server/index.html');
    });
});