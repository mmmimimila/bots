import get from 'lodash/get';
import Api from '@lskjs/server-api';
import Err from '@lskjs/utils/Err';

export default class UsersApi extends Api {
  getRoutes() {
    return {
      ...super.getRoutes(),
      '/me': ::this.me,
      '/list': ::this.find,
      '/find': ::this.find,
      '/count': ::this.count,
      '/get': ::this.findOne,
      '/findOne': ::this.findOne,
      '/create': ::this.create,
      '/update': ::this.update,
      '/delete': ::this.remove,
      '/remove': ::this.remove,
    };
  }
  assign(model, params, fields) {
    // eslint-disable-next-line no-param-reassign
    if (!fields) fields = ['name', 'info', 'role', 'email', 'locale'];
    return super.assign(model, params, fields);
  }
  can(action, req, item) {
    const userId = get(req, 'user._id');
    if (!(this.equal(item._id, userId) || get(req, 'user.role') === 'admin')) throw new Err('!acl', { status: 403 });
  }
  async getParams(req) {
    const { user = {} } = req;
    if (user.role !== 'admin') return { filter: { _notfound: 1 } };
    const { data } = req;
    return data;
  }
  async count(req) {
    await this.isAuth(req);
    const { UserModel } = this.app.models;
    const params = await this.getParams(req);
    return this.cache(['UserApi/count', params], () => UserModel.countByParams(params));
  }
  async me(req) {
    return {
      token: req.token,
      user: req.user,
    };
  }
  async find(req) {
    await this.isAuth(req);
    const { UserModel } = this.app.models;
    const params = await this.getParams(req);
    return this.cache(['UserApi/find', params], async () =>
      this.findAndCountByParams(UserModel, this.withSearchParams(params, 'name'), { req, method: 'find' }),
    );
  }
  async findOne(req) {
    await this.isAuth(req);
    const { UserModel } = this.app.models;
    return this.cache(['UserApi/findOne', req.data], async () => {
      const { _id } = req.data;
      if (!_id) throw this.e(404, '!_id');
      const item = await UserModel.findById(_id);
      if (!item) throw this.e(404, '!item');
      return UserModel.prepare(item, { req, method: 'findOne' });
    });
  }
  async create() {
    throw this.e404(); // TODO: проверить
  }
  async update(req) {
    await this.isAuth(req);
    const { UserModel } = this.app.models;
    const { _id, ...params } = req.data;
    const item = await UserModel.findById(_id);
    if (!item) throw this.e(404, '!item');
    await this.can('update', req, item);
    this.assign(item, params);
    await item.save();
    return UserModel.prepare(item, { req, method: 'update' });
  }
  async remove() {
    throw this.e404(); // TODO: проверить
  }
}
