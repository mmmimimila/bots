import ListApi from '@lskjs/server-api/ListApi';

export default class BotsTelegramMessageApi extends ListApi {
  async count(req) {
    await this.isAuth(req);
    const { BotsTelegramMessageModel } = this.app.models;
    return BotsTelegramMessageModel.countByParams(req.data);
  }
  async find(req) {
    await this.isAuth(req);
    const { BotsTelegramMessageModel } = this.app.models;
    return this.findAndCountByParams(BotsTelegramMessageModel, this.withSearchParams(req.data, 'name'), {
      req,
      method: 'find',
    });
  }
  async findOne(req) {
    await this.isAuth(req);
    const { BotsTelegramMessageModel } = this.app.models;
    const { _id } = req.data;
    if (!_id) throw req.e('params.missing', { status: 404, data: { param: 'id' } });
    const item = await BotsTelegramMessageModel.findById(_id);
    if (!item) throw req.e('item.missing', { status: 404, data: { param: 'id' } });
    return BotsTelegramMessageModel.prepare(item, { req, method: 'findOne' });
  }
}
