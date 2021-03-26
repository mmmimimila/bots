import axios from 'axios';
import Api from '@lskjs/server-api';
import Bluebird from 'bluebird';
import mapValues from 'lodash/mapValues';
import mapKeys from '@lskjs/utils/mapKeys';
import BotsMessageApi from './BotsMessageApi';

export default class BotsApi extends Api {
  async init() {
    await super.init();
    this.botsModule = await this.app.module('bots');
    this.apis = mapValues(this.botsModule.plugins, (plugin) => plugin.Api);
    this.log.trace('apis', Object.keys(this.apis));
  }
  getRoutes() {
    return {
      ...super.getRoutes(),
      '/messages': BotsMessageApi,
      '/photo/:fileId': ::this.photo,
      ...mapKeys(this.apis, (api, name) => (api ? `/${name}` : undefined)),
    };
  }
  async photo(req, res) {
    await this.isAuth(req);
    const { fileId } = req.params;
    const botsModule = await this.app.module('bots');
    const url = await botsModule.bots.telegram.client.telegram.getFileLink(fileId);

    const response = await axios({ url, responseType: 'stream' });

    response.data.pipe(res);
    await Bluebird.delay(10000);
  }
}
