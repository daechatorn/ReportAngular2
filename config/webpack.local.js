var webpackMerge = require('webpack-merge');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = 'LOCAL';

const METADATA = webpackMerge(commonConfig.metadata, {
  'ENV': ENV,
  'POSTAL_REPORT_URL': "http://localhost:10010/",
  'VERSION': '1.0.0'
});

module.exports = webpackMerge(commonConfig, {
  metadata: METADATA,
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8085/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'appCfg.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'POSTAL_REPORT_URL': JSON.stringify(METADATA.POSTAL_REPORT_URL),
        'VERSION': JSON.stringify(METADATA.VERSION)
      }
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});