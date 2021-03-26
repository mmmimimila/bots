export default (...args) => ({
  CompanyStore: require('./CompanyStore').default(...args),
  CompanyUserStore: require('./CompanyUserStore').default(...args),
});
