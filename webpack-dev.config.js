const webpack = require('webpack');
const webpackConfig = require('./webpack-config-base');

webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
);

module.exports = Object.assign({}, webpackConfig, {
    // devtool: '#eval',
    // contentBase: './dist'
});
