const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin, EnvironmentPlugin, ProvidePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const dotenv = require('dotenv');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

dotenv.config({ path: path.resolve(__dirname, '../.env.development') });

// 공유 의존성 관련 설정
const moduleShared = {
  react: {
    singleton: true, // 전역에서 단일 의존성만 사용
    eager: true, // 초기 로딩 지연 사용
    requiredVersion: '^18.2.0', // 18.2.0 버전 사용으로 통일
    strictVersion: true,
  },
  'react-dom': {
    singleton: true,
    eager: true,
    requiredVersion: '^18.2.0',
    strictVersion: true,
  },
};

module.exports = {
  mode: 'development',
  devServer: {
    port: 3010, // 포트 번호
    historyApiFallback: true,
    host: 'localhost', // host명
    liveReload: true,
    watchFiles: [path.resolve(__dirname, '../src')],
  },
  entry: './src/index.tsx',
  output: {
    clean: true,
    // TODO: env 분기필요
    publicPath: 'https://module-federation-example-module.vercel.app/',
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/bundle.[contenthash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  cache: {
    type: process.env.NODE_ENV === 'development' ? 'memory' : 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  // 최적화 관련 옵션들, 나중에 번들 성능 최적화 필요시 활성화
  // performance: {
  //   hints: false,
  //   maxEntrypointSize: 512000,
  //   maxAssetSize: 512000,
  // },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     maxSize: 244000,
  //   }
  // },
  module: {
    rules: [
      /**
       * ods 추가시, process 관련 에러발생 막기위해 추가
       * https://github.com/react-dnd/react-dnd/issues/3425
       * */
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      // svgr react 적용
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css',
      chunkFilename: 'static/bundle.[contenthash].css',
      ignoreOrder: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new CleanWebpackPlugin(),
    // env에 선언된 환경변수들 process.env로 접근하기 위해 추가
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new EnvironmentPlugin({}),
    new ProvidePlugin({
      process: 'process/browser',
    }),
    new ModuleFederationPlugin({
      name: 'User',
      filename: 'user.remoteEntry.js',
      exposes: {
        './mftest': './src/entries/TestRoot',
      },
      // 공유 의존성 설정
      shared: moduleShared,
    }),
    process.env.ANALYZE === 'true' && new BundleAnalyzerPlugin(),
  ],
};
