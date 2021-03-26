import BaseBotPlugin from '@lskjs/bots/plugins/BaseBotPlugin';

export default class ExamplePlugin extends BaseBotPlugin {
  providers = ['telegram', 'discord'];

  async run() {
    await super.run();
  }

  async runBot(bot, name) {
    const types = ['message', 'guildMemberAdd'];
    types.forEach((type) => {
      bot.on(type, (ctx) => {
        console.log(`${name}[${bot.provider}] <${type}> `, ctx.message);
      });
    });
  }
}
