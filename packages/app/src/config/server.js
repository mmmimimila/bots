import config from '@lskjs/config';
import serverConfig from '@lskjs/server/config';
import client from './client';

// const level = __DEV__ ? 'info' : 'warn';
// const level = 'trace';

export default config({
  db: {
    // debug: __DEV__,
  },
  log: {
    // name: 'app',
    // debug: true,
    // level,
  },
  i18: require('./i18.server').default,
  webserver: {
    ...serverConfig,
    port: process.env.PORT || 8080,
    express: {
      ...serverConfig.express,
      'trust proxy': true,
    },
    public: `${__dirname}/../../public`,
    storage: `${__dirname}/../../storage`,
  },
  client,
});
