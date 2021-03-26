export default async ({ page, i18 }) => {
  return page
    .meta({
      title: i18.t('pages.botsMessages.title'),
      url: '/admin',
    })
    .component(import('../../pages/admin/AdminIndexPage'), {});
};
