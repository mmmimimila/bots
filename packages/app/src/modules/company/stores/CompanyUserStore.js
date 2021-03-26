/* eslint-disable max-classes-per-file */
import { observable } from 'mobx';
import set from 'lodash/set';
import CrudApi from '@lskjs/mobx/stores/CrudApi';
import CrudStore from '@lskjs/mobx/stores/CrudStore';

export class CompanyUserApi extends CrudApi {
  base = '/api/companyUsers';
}

export default app =>
  class CompanyUserStore extends CrudStore {
    static api = new CompanyUserApi({ app });

    @observable userId;
    @observable user;
    @observable companyId;
    @observable company;
    @observable value;

    setStateField(item, value) {
      const { UserStore, CompanyStore } = app.stores;
      if (item === 'user') {
        set(this, item, new UserStore(value));
      } else if (item === 'company') {
        set(this, item, new CompanyStore(value));
      } else {
        super.setStateField(item, value);
      }
    }
  };
