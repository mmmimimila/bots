import createKeyboard from '@lskjs/bots-base/utils/createKeyboard';
import BaseBotPlugin from '@lskjs/bots-plugin';
import userImpressionInChat from '@lskjs/bots-plugin-likes/utils/userImpressionInChat';
import getYoutubeVideoId from '@lskjs/extract/getYoutubeVideoId';
import get from 'lodash/get';

export default class DownloadPlugin extends BaseBotPlugin {
  providers = ['telegram'];
  // TODO: add i18
  _i18 = {
    t: (key, params = {}) => {
      const { count = '', link = '' } = params;
      const table = {
        bot: {
          likesPlugin: {
            like: `❤️ ${count}`,
            disslike: `💔 ${count}`,
          },
          downloadPlugin: {
            tryAgain: 'Попробовать снова',
            youtube: 'Ввести ссылку',
            toSubscribe: `Подпишись на паблик и поставь лайк для продолжения\n\n${link}`,
            toLike: `Лайкни пост в паблике для продолжения\n\n${link}`,
          },
        },
      };
      return get(table, key, key);
    },
  };
  async init() {
    await super.init();
    this.config = this.app.config.bots.plugins.download;
  }

  createKeyboard(videoId = '') {
    const buttons = [
      [
        {
          type: 'callback',
          title: this._i18.t('bot.downloadPlugin.tryAgain'),
          value: `/youtube?videoId=${videoId}`,
        },
      ],
      [
        {
          type: 'callback',
          title: this._i18.t('bot.downloadPlugin.youtube'),
          value: `/youtube`,
        },
      ],
    ];
    return createKeyboard({
      type: 'inline',
      buttons,
    });
  }

  getRoutes() {
    return [
      {
        path: '/youtube',
        action: async ({ ctx, req, bot }) => {
          if (ctx.update.callback_query) ctx.answerCbQuery();
          const { videoId } = req.query;
          if (videoId) {
            return ctx.redirect({
              path: '/get-youtube-video-preview',
              query: { videoId },
            });
          }
          await ctx.reply('Скиньте ссылку на видео на youtube');
          return ctx.nextRedirect({
            path: '/get-youtube-video-preview',
          });
        },
      },
      {
        path: '/get-youtube-video-preview',
        action: async ({ ctx, req, bot }) => {
          let { videoId } = req.query;
          if (!videoId) {
            const url = bot.getMessageText(ctx);
            videoId = getYoutubeVideoId(url);
          }
          if (!videoId) {
            await ctx.reply('Ссылка не действительна. Попробуйте ещё раз');
            return ctx.redirect({ path: '/youtube' });
          }
          const userId = bot.getUserId(ctx);
          const userInChat = await bot.userInChat(this.config.chatId, userId);

          if (!userInChat) return ctx.redirect({ path: '/to-subscribe', query: { videoId } });
          const likeInChat = await userImpressionInChat({
            telegramChatId: this.config.chatId,
            telegramUserId: userId,
            botsModule: this.botsModule,
            type: 'like',
          });
          if (!likeInChat) return ctx.redirect({ path: '/to-like', query: { videoId } });
          const imageUrl = `https://i.ytimg.com/vi/${videoId}/hq720.jpg`;
          return ctx.replyWithPhoto(imageUrl);
        },
      },
      {
        path: '/to-subscribe',
        action: async ({ ctx, req, bot }) => {
          const { videoId } = req.query;
          const text = this._i18.t('bot.downloadPlugin.toSubscribe', { link: this.config.link });
          return bot.replyContent(ctx, text, this.createKeyboard(videoId));
        },
      },
      {
        path: '/to-like',
        action: async ({ ctx, req, bot }) => {
          const { videoId } = req.query;
          const text = this._i18.t('bot.downloadPlugin.toLike', { link: this.config.link });
          return bot.replyContent(ctx, text, this.createKeyboard(videoId));
        },
      },
    ];
  }
}
