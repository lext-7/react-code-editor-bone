const webpack = require('webpack');
const path = require('path');
const rucksack = require('rucksack-css');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].css');

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    entry: {
        index: './examples/index.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        // publicPath: '/',
        sourceMapFilename: '[file].map',
    },
    resolve: {
        modules: [
            'node_modules',
        ],
        extensions: [
            '.js',
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: path.join(__dirname, '.babel_cache'),
                    presets: [
                        ['es2015'],
                        'react',
                        'stage-0',
                    ],
                    plugins: [
                        'transform-runtime',
                        ['import', {
                            libraryName: 'antd',
                            style: true,
                        }],
                    ],
                    babelrc: false,
                },
            },
            {
                test: /\.css$/,
                loader: extractCSS.extract(['css-loader']),
            },
            {
                test: /\.less$/,
                loader: extractCSS.extract(['css-loader', 'postcss-loader', 'less-loader']),
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&minetype=application/font-woff',
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&minetype=application/octet-stream',
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&minetype=image/svg+xml',
            },
            {
                test: /\.(eot|png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000',
            },
            {
                test: /\.html?$/,
                loader: 'file-loader?name=[name].[ext]',
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV),
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js',
        }),
        extractCSS,
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [
                    rucksack(),
                    autoprefixer({
                        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
                    }),
                ],
            },
        }),
        new CopyWebpackPlugin([
            {
                from: 'node_modules/monaco-editor/min/vs',
                to: 'vs',
            },
        ]),
    ],
};
