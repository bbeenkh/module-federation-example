const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const dotenv = require('dotenv');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
dotenv.config({ path: path.resolve(__dirname, '../.env.development') });

/**
 * 개발 환경배포용 config
 */
const config = {
  mode: 'production',
  devtool: 'eval-cheap-source-map',
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
  output: {
    publicPath: process.env.HOST_URL+'/',
  },
};

module.exports = merge(commonConfig, config);
