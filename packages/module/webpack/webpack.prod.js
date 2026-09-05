const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const dotenv = require('dotenv');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
dotenv.config({ path: path.resolve(__dirname, '../.env.production') });

/**
 * 실서버 환경 배포용 config
 */
const config = {
  mode: 'production',
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
  output: {
    publicPath: process.env.HOST_URL + '/',
  },
};

module.exports = merge(commonConfig, config);
