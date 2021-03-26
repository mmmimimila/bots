export default async ({ page, i18 }) => {
  return page
    .meta({
      title: i18.t('pages.botsMessages.title'),
      url: '/cabinet/bots/messages',
    })
    .component(import('../../../pages/admin/BotsIndexPage'), {});
};
