import about from './about';

export default {
  storage: {
    prefix: about.code,
  },
  log: {
    level: __DEV__ ? (__STAGE__ === 'isuvorov' ? 'trace' : 'debug') : 'warn', // eslint-disable-line no-nested-ternary
  },
  i18: require('./i18.client').default,
  about,
};
