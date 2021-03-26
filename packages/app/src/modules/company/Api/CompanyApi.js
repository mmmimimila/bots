import get from 'lodash/get';
import Api from '@lskjs/server-api';

export default class CompanyApi extends Api {
  getRoutes() {
    return {
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
    if (action === 'create') return;
    const userId = get(req, 'user._id');
    if (!(this.equal(item._id, userId) || get(req, 'user.role') === 'admin')) throw this.e(403, '!acl');
  }
  async getParams(req) {
    const { user = {} } = req;
    if (user.role !== 'admin') return { filter: { _notfound: 1 } };
    const { data } = req;
    return data;
  }
  async count(req) {
    await this.isAuth(req);
    const { CompanyModel } = this.app.models;
    const params = await this.getParams(req);
    return this.cache(['CompanyApi/count', params], () => CompanyModel.countByParams(params));
  }
  async find(req) {
    // await this.isAuth(req);
    const { CompanyModel } = this.app.models;
    const params = await this.getParams(req);
    return this.cache(['CompanyApi/find', params], async () =>
      this.findAndCountByParams(CompanyModel, this.withSearchParams(params, 'name'), { req, method: 'find' }),
    );
  }
  async findOne(req) {
    await this.isAuth(req);
    const { CompanyModel } = this.app.models;
    return this.cache(['CompanyApi/findOne', req.data], async () => {
      const { _id } = req.data;
      if (!_id) throw this.e(404, '!_id');
      const item = await CompanyModel.findById(_id);
      if (!item) throw this.e(404, '!item');
      return CompanyModel.prepare(item, { req, method: 'findOne' });
    });
  }
  async create(req) {
    await this.isAuth(req);
    await this.can('create', req);
    const { CompanyModel } = this.app.models;
    const ownerUserId = get(req, 'user._id');
    const data = req.body || {};
    const Company = await CompanyModel.create({
      ...data,
      ownerUserId,
    });
    return CompanyModel.prepare(Company, { req, method: 'create' });
  }
  async update(req) {
    await this.isAuth(req);
    const { CompanyModel } = this.app.models;
    const { _id, ...params } = req.data;
    const item = await CompanyModel.findById(_id);
    if (!item) throw this.e(404, '!item');
    await this.can('update', req, item);
    this.assign(item, params);
    await item.save();
    return CompanyModel.prepare(item, { req, method: 'update' });
  }
  async remove() {
    throw 500;
    // await this.isAuth(req);
    // const { CompanyModel } = this.app.models;
    // const { _id } = req.data;
    // const item = await CompanyModel.findById(_id);
    // if (!item) throw this.e(404, '!item');
    // await this.can('remove', req, item);
    // return CompanyModel.deleteOne({ _id });
  }
}
