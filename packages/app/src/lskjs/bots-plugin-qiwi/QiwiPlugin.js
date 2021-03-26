import createKeyboard from '@lskjs/bots-base/utils/createKeyboard';
import BaseBotPlugin from '@lskjs/bots-plugin';
import QiwiBillPaymentsAPI from '@qiwi/bill-payments-node-js-sdk';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

export default class QiwiPlugin extends BaseBotPlugin {
  providers = ['telegram'];

  // TODO: add i18
  _i18 = {
    t: (key, params = {}) => {
      const { count = '' } = params;
      const table = {
        bot: {
          likesPlugin: {
            like: `❤️ ${count}`,
            disslike: `💔 ${count}`,
          },
          qiwiPlugin: {
            pay: 'Оплатить',
          },
        },
      };
      return get(table, key, key);
    },
  };

  createKeyboard(url) {
    const buttons = [
      {
        type: 'url',
        title: this._i18.t('bot.qiwiPlugin.pay'),
        value: url,
      },
    ];
    return createKeyboard({
      type: 'inline',
      buttons,
    });
  }

  getRandomIntInclusive(Min, Max) {
    const min = Math.ceil(Min);
    const max = Math.floor(Max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  async init() {
    await super.init();
    this.config = this.app.config.billing.qiwi;
    const { privateKey } = this.config;
    this.qiwiApi = new QiwiBillPaymentsAPI(privateKey);
  }

  async getBillInfo(billId) {
    try {
      const info = await this.qiwiApi.getBillInfo(billId);
      return info;
    } catch (error) {
      return {};
    }
  }

  getRoutes() {
    return [
      {
        path: '/qiwi_info',
        action: async ({ ctx, req, bot }) => {
          await ctx.reply('Введите id заказа');
          await ctx.nextRedirect({
            path: '/qiwiInfo',
          });
        },
      },
      {
        path: '/qiwiInfo',
        action: async ({ ctx, req, bot }) => {
          const billId = bot.getMessageText(ctx);
          const bill = await this.getBillInfo(billId);
          if (isEmpty(bill)) {
            await ctx.reply(`Заказ не найден. Попробуйте ещё раз.`);
            return ctx.redirect({ path: '/qiwi_info' });
          }
          this.log.debug('Billing data info: ', bill);
          const { amount, status } = bill;
          const { currency, value } = amount;
          const messageText = `Заказ №${billId}\n\nStatus: ${status.value}\nValue: ${value} ${currency}`;
          await ctx.reply(messageText);
        },
      },
      {
        path: '/qiwi_create',
        action: async ({ ctx, req, bot }) => {
          const { publicKey } = this.config;
          const billId = this.getRandomIntInclusive(10000000, 99999999);
          const bill = await this.getBillInfo(billId);
          if (!isEmpty(bill)) return ctx.redirect({ path: '/qiwi_create' });
          const lifetime = this.qiwiApi.getLifetimeByDay(1);
          const params = {
            billId,
            publicKey,
            amount: 20,
            currency: 'RUB',
            comment: `Тестовый заказ №${billId}`,
            customFields: {
              telegramUserId: ctx.from.id,
              productId: '123',
            },
            successUrl: `https://merchant.com/payment/success?billId=${billId}`,
            expirationDateTime: lifetime,
          };

          const data = await this.qiwiApi.createBill(billId, params);
          this.log.debug('Billing create: ', data);
          const extra = this.createKeyboard(data.payUrl);
          await bot.replyContent(ctx, `Ваш номер заказа: ${billId}`, extra);
        },
      },
    ];
  }
}
