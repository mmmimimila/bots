import Bluebird from 'lodash';
import BaseBotPlugin from '@lskjs/bots/plugins/BaseBotPlugin';

const animation = [
  '💥💥💥💥💥!!!В Н И М А Н И Е!!!💥💥💥💥💥',
  '✌  😄  ✌',
  '☝️  😄  👍',
  '💪  😄  👉',
  '🖕  😄  🖕',
  '✌  😄  ✌',
  '☝️  😄  👍',
  '💪  😄  👉',
  '🖕  😄  🖕',
  '*DELETED*',
];

export default class CounterPlugin extends BaseBotPlugin {
  providers = ['telegram'];
  async runBot(bot) {
    bot.on('message', async (ctx) => {
      if (!bot.isMessageContains(ctx, /инферно/)) return;
      const [startMessage, messages] = animation;
      const newMessage = await bot.sendMessage(ctx, startMessage);
      await Bluebird.each(messages, async (message) => {
        await Bluebird.delay(1000);
        await bot.editMessageText(newMessage, message);
      });
    });
  }
}
