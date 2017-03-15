var webpackMerge = require('webpack-merge');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = 'DEV';

const METADATA = webpackMerge(commonConfig.metadata, {
  'ENV': ENV,
  'POSTAL_REPORT_URL': "/PRSpa/",
  'VERSION': "1.0.0",
  'CONTEXT_ROOT' : "PRSpa/"
});

module.exports = webpackMerge(commonConfig, {
  metadata: METADATA,
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/PRSpa/',
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
        'VERSION': JSON.stringify(METADATA.VERSION),
        'CONTEXT_ROOT':JSON.stringify(METADATA.CONTEXT_ROOT)
      }
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});

