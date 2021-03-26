import BaseBotPlugin from '@lskjs/bots/plugins/BaseBotPlugin';

export default class HappyBirthdayPlugin extends BaseBotPlugin {
  providers = ['telegram', 'discord'];

  async runBot(bot) {
    bot.on('message', async (ctx) => {
      if (!bot.isMessageCommands(ctx, ['happy', 'дршка'])) return;

      const text = bot.getMessageText(ctx);

      const rawText = text.substr(6);
      const [username, ...messageTexts] = rawText.split(' ');
      const chatId = bot.getMessageChatId(ctx);
      const chat = await bot.getChat(chatId);

      await bot.setChatTitle(chatId, `С днем рождения ${username} ${messageTexts.join(' ')} // ${chat.title}`);
    });
  }
}
