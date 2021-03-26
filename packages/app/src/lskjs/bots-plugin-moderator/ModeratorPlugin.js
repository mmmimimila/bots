import Bluebird from 'bluebird';
import filter from 'lodash/filter';
import BaseBotPlugin from '@lskjs/bots/plugins/BaseBotPlugin';

const canonizeRules = (a) => a;
export default class ModeratorPlugin extends BaseBotPlugin {
  providers = ['telegram', 'discord'];
  config = {
    rules: [
      { where: [-368345831], when: [{ types: ['video_note'] }], then: ['delete'] },
      { when: { types: ['video_note'] }, then: [{ type: 'repost', ids: [123] }] }, // mediaChatId
      {
        where: [-368345831],
        when: [{ reaction: ['like'] }],
        what: 'reply',
        then: [{ action: 'repost', ids: [-368345831] }],
      },
    ],
  };
  runBot(bot) {
    const rules = canonizeRules(this.config.rules); // this.config = {chats};
    bot.on('message', async (ctx) => {
      const chatId = bot.getMessageChatId(ctx);
      const messageType = bot.getMessageType(ctx);

      const rules = filter(rules, ({ where }) => !where || where.includes(chatId));
      await Bluebird.map(rules, ({ when }) => {
        if (when && !Array.isArray(when)) [when] = when;

        const doAction =
          !when ||
          some(when, ({ types, reaction }) => {
            if (reaction) {
              return bot.isMessageLike(message);
            }
            if (types) {
              return types.includes(messageType);
            }
            return false;
          });
        if (!doAction) return;
        let repostId;
        if (what === 'reply') {
          repostId = bot.getReplyMessageId(ctx);
        } else {
          repostId = bot.getMessageId(ctx);
        }

        const repliedMessage = bot.getRepliedMessage(message);

        return bot.repost(repliedMessage, {
          chatId: repostChatId,
          forwardFrom: chatId,
          message: repostId,
        });
        // if (!rule) return;

        // if (then === 'delete')
        // const { types = [] } = rule;
        // if (!types.includes(bot.getMessageType)) {
        //   this.bot.deleteMessage(message);
        //   this.bot.sendVideoNote(message, 'DQADAgAD-gMAAqlagUm_49HHEQjRIhYE'); // file_id надо указать доступный
        // }
      });
    });
  }
}

// doAction(message) {
//   if (!!message.video_note && message.chat.id !== mediaChatId) {
//     this.bot.sendVideoNote(mediaChatId, message.video_note.file_id);
//   }

//   let firstSign;
//   if (message && message.text && message.text.codePointAt) {
//     firstSign =  message.text.codePointAt(0);
//   } else if (message && message.sticker && message.sticker.emoji) {
//     firstSign = message.sticker.emoji.codePointAt(0);
//   }
//   if (firstSign && likes.includes(firstSign) && !!message.reply_to_message) {
//     this.repost({
//       chatId: repostChatId,
//       forwardFrom: (message.chat && message.chat.id) || (message.from && message.from.id),
//       message: message.reply_to_message,
//     });
//   }
// }

// this.deleteMessage(message.chat.id, message.message_id);
// this.bot.sendVideoNote(message.chat.id, 'DQADAgAD-gMAAqlagUm_49HHEQjRIhYE'); //file_id надо указать доступный
