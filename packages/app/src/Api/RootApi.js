import Api from '@lskjs/server-api/Api';

import IndexApi from './IndexApi';

export default class RootApi extends Api {
  getRoutes() {
    return {
      ...super.getRoutes(),
      '/api': IndexApi,
      '/storage/*': this.e404,
      '/assets/*': this.e404,
      '/favicon.ico': this.e404,
      '*': this.app && this.app.reactApp ? this.app.reactApp.render : this.e404,
      // '*': this.app.reactApp ? this.app.reactApp.render : this.e404,
    };
  }
}
