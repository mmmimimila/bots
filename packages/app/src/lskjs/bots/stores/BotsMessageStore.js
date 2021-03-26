/* eslint-disable max-classes-per-file */
import CrudApi from '@lskjs/mobx/stores/CrudApi';
import CrudStore from '@lskjs/mobx/stores/CrudStore';

export class BotsTelegramMessageStoreApi extends CrudApi {
  base = '/api/bots/messages';
}

export default (uapp) =>
  class BotsTelegramMessageStoreStore extends CrudStore {
    
    static api = new BotsTelegramMessageStoreApi({ uapp });
  };
