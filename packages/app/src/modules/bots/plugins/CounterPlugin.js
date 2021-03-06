import Bluebird from 'lodash';
import BaseBotPlugin from '@lskjs/bots/plugins/BaseBotPlugin';

const animation = [
  'π₯π₯π₯π₯π₯!!!Π Π Π Π Π Π Π Π!!!π₯π₯π₯π₯π₯',
  'β  π  β',
  'βοΈ  π  π',
  'πͺ  π  π',
  'π  π  π',
  'β  π  β',
  'βοΈ  π  π',
  'πͺ  π  π',
  'π  π  π',
  '*DELETED*',
];

export default class CounterPlugin extends BaseBotPlugin {
  providers = ['telegram'];
  async runBot(bot) {
    bot.on('message', async (ctx) => {
      if (!bot.isMessageContains(ctx, /ΠΈΠ½ΡΠ΅ΡΠ½ΠΎ/)) return;
      const [startMessage, messages] = animation;
      const newMessage = await bot.sendMessage(ctx, startMessage);
      await Bluebird.each(messages, async (message) => {
        await Bluebird.delay(1000);
        await bot.editMessageText(newMessage, message);
      });
    });
  }
}
