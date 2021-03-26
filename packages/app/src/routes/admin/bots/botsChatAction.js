// import Page from '@lskjs/page';

export default async ({ uapp, page, query, i18 }) => {
  const { ListStore, BotsTelegramMessageStore } = uapp.stores;
  const listStore = new ListStore({
    api: BotsTelegramMessageStore,
    sort: { date: -1 },
    getFindParams: (store, { filter: { telegramUserId, ...filter }, ...params }) => ({
      ...params,
      filter: {
        ...filter,
        'from.id': +telegramUserId || undefined,
      },
      select: ['_id', 'botId', 'from', 'chat', 'text', 'date', 'message_id', 'photo', 'caption'],
    }),
  });
  if (__CLIENT__) {
    page.onExit(ListStore.connect({ page, listStore, query }));
    await listStore.fetch();
  }
  return page
    .meta({
      title: i18.t('pages.botsMessages.title'),
      url: '/cabinet/bots/chat',
    })
    .component(import('../../../pages/admin/BotsChatPage'), {
      listStore,
    });
};
