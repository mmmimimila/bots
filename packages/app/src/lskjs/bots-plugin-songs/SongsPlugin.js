/* eslint-disable no-await-in-loop */
import BaseBotPlugin from '@lskjs/bots/plugins/BaseBotPlugin';
import get from 'lodash/get';
import random from 'lodash/random';
import sample from 'lodash/sample';
import Bluebird from 'bluebird';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import getSpreadsheetJson from '@lskjs/getspreadsheet/getSpreadsheetJson';

export default class SongsPlugin extends BaseBotPlugin {
  providers = ['telegram', 'discord'];

  async init() {
    await super.init();
    this.botsConfig = get(this, 'botsModule.config.bots');
    this.dbs = await asyncMapValues(this.config.dbs || {}, async (db) => {
      const { spreadsheet: url } = db;
      const data = await getSpreadsheetJson(url);
      return {
        ...db,
        data,
      };
    });
    this.log.trace('dbs', Object.keys(this.dbs));
  }
  async run() {
    await super.run();
    // await asyncMapValues(this.botsConfig || {}, async (bot, name) => {
    //   console.log({ bot, name });
    // });
  }
  getContent(row) {
    if (!row) return null;
    if (row.image) {
      return {
        type: 'photo',
        url: row.image,
        caption: row.text,
      };
    }
    if (row.text) {
      return {
        type: 'text',
        text: row.text,
      };
    }
    return null;
  }
  async runBot(bot, botName) {
    await asyncMapValues(this.botsConfig || {}, async (config, name) => {
      if (name !== botName) return;
      if (!this.dbs[name]) return;
      bot.on('message', async (ctx) => {
        if (!bot.isMessageCommands(ctx, ['sing', 'song', 'пой'])) return;
        const { data } = this.dbs[name];
        const length = random(1, 10);
        const startRowId = random(0, data.length - 1 - length);
        const finishRowId = startRowId + length;
        for (let rowId = startRowId; rowId < finishRowId; rowId += 1) {
          const row = data[rowId];
          await ctx.replyWithChatAction('typing');
          await Bluebird.delay(random(1000, 3000));
          // await ctx.editMessageText();
          // await ctx.answerCbQuery();
          // await ctx.editMessageText(this.app.i18.t('bot.city.enter'));
          // await ctx.answerCbQuery();
          const content = this.getContent(row);
          if (!content) break;
          await bot.sendContent(ctx, content);
        }
      });
    });
  }
}
