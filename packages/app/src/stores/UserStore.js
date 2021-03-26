/* eslint-disable max-classes-per-file */
import { computed, observable } from 'mobx';
import CrudApi from '@lskjs/mobx/stores/CrudApi';
import CrudStore from '@lskjs/mobx/stores/CrudStore';

// export class UserApi extends CrudApi {
//   base = '/api/users';
//   // update(vals) {
//   //   console.log('update', vals, this.api)

//   //   return this.fetch(`${this.base}/update`, {
//   //     method: 'POST',
//   //     qs: { _id },
//   //     body,
//   //   });
//   // }
// }

const sample = {
  avatar: '/assets/no-avatar.png',
  fullName: 'Счастливый Пользователь',
};

export class UserApi extends CrudApi {
  base = '/api/users';
  updatePassword(data) {
    return this.fetch(`${this.base}/updatePassword`, {
      method: 'POST',
      data,
    });
  }
  sendEmail(data) {
    return this.fetch(`${this.base}/sendEmail`, {
      method: 'POST',
      data,
    });
  }
  updateEmail(data) {
    return this.fetch(`${this.base}/updateEmail`, {
      method: 'POST',
      data,
    });
  }
}

export default (uapp) =>
  class UserStore extends CrudStore {
    static api = new UserApi({ uapp });

    static async updatePassword({ _id, oldPassword, newPassword }) {
      return this.wrap(this.api.updatePassword({ _id, oldPassword, newPassword }));
    }
    static sendEmail(data) {
      return this.wrap(this.api.sendEmail(data));
    }
    static updateEmail({ password, email }) {
      return this.wrap(this.api.updateEmail({ password, email }));
    }

    @observable _id;
    @observable role;
    @observable username;
    // @observable avatar;
    @observable info = {};
    @observable private = {};

    @computed get avatar() {
      // console.log('get avatar', this.profile && this.profile.avatar );
      return (this.info && this.info.avatar) || (this.profile && this.profile.avatar);
    }
    @computed get link() {
      return `/cabinet/users/${this._id}`;
    }
    // update(params) {
    //   console.log('user.update', params);
    //   this.setState(params);
    // }
    // reset(params) {
    //   console.log('user.reset', params);
    // }
  };
