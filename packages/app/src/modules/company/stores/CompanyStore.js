/* eslint-disable max-classes-per-file */
import { observable, computed } from 'mobx';
import set from 'lodash/set';
import CrudApi from '@lskjs/mobx/stores/CrudApi';
import CrudStore from '@lskjs/mobx/stores/CrudStore';

export class CompanyApi extends CrudApi {
  base = '/api/companies';
  toTop(_id) {
    return this.fetch(`${this.base}/toTop`, {
      method: 'POST',
      qs: { _id },
    });
  }
  relation(body) {
    return this.fetch(`${this.base}/relation`, {
      method: 'POST',
      body,
    });
  }
}

export default app =>
  class CompanyStore extends CrudStore {
    static api = new CompanyApi({ app });

    static toTop(_id, params) {
      return this.wrap(this.api.toTop(_id), params);
    }

    static relation({ companyId, userId, value, ...other } = {}, params) {
      return this.wrap(this.api.relation({ companyId, userId, value, ...other }), {
        ...params,
        Model: app.stores.CompanyUser,
      });
    }

    join({ userId, ...params }) {
      return this.constructor.relation({ companyId: this._id, userId, value: 1, ...params });
    }

    leave(userId) {
      return this.constructor.relation({ companyId: this._id, userId, value: 0 });
    }

    relation(userId, params = {}) {
      return this.constructor.relation({ companyId: this._id, userId, ...params });
    }

    @observable title;
    @observable image;
    @observable url;
    @observable tags = [];
    @observable offers = [];

    setStateField(item, value) {
      const { UserStore } = app.stores;
      if (item === 'user') {
        set(this, item, new UserStore(value));
      } else {
        super.setStateField(item, value);
      }
    }

    @computed get link() {
      return `/admin/companies/${this._id}`;
    }
  };
