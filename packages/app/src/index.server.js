import ready from '@lskjs/utils/polyfill';

import App from './App';
import config from './config/server';

ready();

export default App.createAndRun({ config })
  .then((app) => {
    global.app = app;
    // const globalLog = app.log.createChild({ ns: '', name: '' });
    // console._log = console.log;
    // console.log = (...args) => globalLog.log(...args);
  })
  .catch((err) => {
    console.error(err);
    throw err;
    // console.log(app);
  });
