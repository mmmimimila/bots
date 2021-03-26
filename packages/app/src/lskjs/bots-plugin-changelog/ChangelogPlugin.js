import BaseBotPlugin from '@lskjs/bots/plugins/BaseBotPlugin';
import getGitMessage from './getGitMessage';

export default class ChangelogPlugin extends BaseBotPlugin {
  providers = ['telegram', 'discord'];
  config = {
    autosend: true,
    channels: [
      {
        bot: 'telegram',
        id: 1234,
      },
    ],
  };
  async sendCommitMessage({ force, bot, ctx }) {
    const { channels } = this.config;
    const { message, author, id, isNew, isFlood } = getGitMessage(`${process.cwd()}/git_commit_message.txt`);
    const repo = 'https://github.com/broteeshkies/bratishka';
    const text = `
#ОБНОВЛЕНИЕ от ${author}

${message}

${repo}/commit/${id}
`.trim();

    const isNeedToSend = force || (isNew && !isFlood);
    if (!isNeedToSend) return;
    if (bot && ctx) {
      await bot.sendMessage(ctx, text);
    } else {
      await Promise.map(channels, async ({ bot, id }) => {
        await this.botsModule.bots[bot].sendMessage(id, text);
      });
    }
  }

  async runBot(bot) {
    bot.on('message', async (ctx) => {
      if (!bot.isMessageCommands(ctx, ['changelog'])) return;
      this.sendCommitMessage({ bot, force: true, ctx });
    });
  }

  async run() {
    await super.run();
    const { authsend } = this.config;
    if (authsend) {
      this.sendCommitMessage().catch((err) => this.log.error(err));
    }
  }
}
