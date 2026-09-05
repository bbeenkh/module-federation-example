const { configure } = require('quasar/wrappers');
const path = require('path');
const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin;
const { ProvidePlugin } = require('webpack');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, './.env') });

/**
 * Module Federation 공유 의존성 설정
 */
const moduleShared = {
  react: {
    singleton: true,
    eager: true,
    requiredVersion: '^18.2.0',
    strictVersion: true,
  },
  'react-dom': {
    singleton: true,
    eager: true,
    requiredVersion: '^18.2.0',
    strictVersion: true,
  },
};

/**
 * Module Federation remote url 설정
 */
const getRemoteUrlByEnv = () => {
  if (process.env.LOCAL_ENV === 'true') {
    return 'http://localhost:3010';
  } else {
    return process.env.VUE_APP_REACT_MODULE_FED_URL;
  }
};

module.exports = configure(function (ctx) {
  return {
    supportTS: true,

    boot: ['axios', 'pinia'],

    css: ['app.css'],

    extras: [
      'roboto-font',
      'material-icons',
    ],

    build: {
      env: require('dotenv').config().parsed,
      vueRouterMode: 'hash',

      extendWebpack(cfg) {
        // quasar & module federation 연동을 위해 entry 변경
        cfg.entry = path.resolve(__dirname, './.quasar/main.js');

        cfg.plugins.push(
          new (require('webpack').DefinePlugin)({
            'process.env': JSON.stringify(process.env),
          }),
        );

        /**
         * Module Federation 리모트 모듈 설정
         */
        cfg.plugins.push(
          new ModuleFederationPlugin({
            name: 'main',
            remotes: {
              User: `User@${getRemoteUrlByEnv()}/user.remoteEntry.js`,
            },
            shared: moduleShared,
          }),
          new ProvidePlugin({
            process: 'process/browser.js',
          }),
        );
      },
    },

    devServer: {
      server: { type: 'http' },
      port: 8081,
      open: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      proxy: {
        '/remoteEntry': {
          target: getRemoteUrlByEnv(),
          changeOrigin: true,
        },
      },
    },

    framework: {
      config: {},
      lang: 'ko-KR',
      plugins: ['Dialog', 'Notify', 'Loading'],
    },

    animations: [],
  };
});
