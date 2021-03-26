import BaseModel from '@lskjs/db/BaseModel';

export default class NewUserModel extends BaseModel {
  static schema = {
    email: String,
    name: {
      type: String,
    },
  };
  static options = {
    model: 'NewUser',
    collection: 'new_user',
  };

  get firstName() {
    return (this.name || '').split(' ')[0];
  }

  set firstName(value) {
    // if (!this.info) this.info = {};
    this.name = [value, this.lastName()].join(' ');
  }

  get lastName() {
    return (this.name || '').split(' ')[1];
  }

  set lastName(value) {
    // if (!this.info) this.info = {};
    this.name = [this.firstName(), value].join(' ');
  }
}
