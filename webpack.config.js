'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: [
        './src/app/module/module.js',
        './node_modules/angular-input-masks/src/angular-input-masks.js',
        './node_modules/angular-i18n/angular-locale_pt-br.js'
    ],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.min.js'
    },
    devtool: 'eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        root: __dirname,
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }, {
                test: /\.css$/, loader: "style!css"
            }, {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }, {
                test: /\.html$/,
                loader: 'raw'
            }, {
                test: /\.(png|jpg|jpeg|gif|woff)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/app/index.html',
            inject: 'body'
        }),
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
    devServer: {
        contentBase: './build',
        stats: 'minimal'
    }
};
