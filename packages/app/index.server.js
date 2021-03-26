
require('@babel/register').default(require('./.babelrc'));
require('@babel/polyfill');

require('./src/index.server');
