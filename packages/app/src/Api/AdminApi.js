import Api from '@lskjs/server-api';

export default class AdminApi extends Api {
  getRoutes() {
    return {
      '/': () => this.fullPath,
      '*': () => {
        return {
          fullPath: this.fullPath,
          path: this.path,
        };
      },
    };
  }
}
