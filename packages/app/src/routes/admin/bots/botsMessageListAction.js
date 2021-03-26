export default async ({ uapp, page, query, i18 }) => {
  const { ListStore, BotsMessageStore } = uapp.stores;
  const listStore = new ListStore({
    api: BotsMessageStore,
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
      url: '/cabinet/bots/messages',
    })
    .component(import('../../../pages/admin/BotsMessageListPage'), {
      listStore,
    });
};
