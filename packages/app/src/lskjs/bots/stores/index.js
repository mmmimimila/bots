// export default (...args) => ({
//   BotsMessageStore: require('./BotsMessageStore').default(...args),
// });

export default {
  BotsMessageStore: () => import('./BotsMessageStore'),
};
