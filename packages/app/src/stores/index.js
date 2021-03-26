// export default (...args) => ({
//   ...require('@lskjs/mobx/stores').default,
//   ...require('../lskjs/bots/stores').default(...args),
//   UserStore: require('./UserStore').default(...args),
// });
import botStores from '../lskjs/bots/stores';

export default {
  // ...require('@lskjs/mobx/stores').default,
  ...botStores,
  UserStore: () => import('./UserStore'),
};
