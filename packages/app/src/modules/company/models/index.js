export default (...args) => ({
  CompanyModel: require('./CompanyModel').default(...args),
  CompanyUserModel: require('./CompanyUserModel').default(...args),
});
