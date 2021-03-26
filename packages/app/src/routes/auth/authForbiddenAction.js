export default async ({ page, module, grant, req }) => {
  if (grant.cache.can('cabinet.access')) return page.redirect(req.query.r || '/cabinet');
  const view = 'forbidden';
  return page
    .meta({
      title: 'pages.authForbidden.title',
      url: '/auth/restore',
    })
    .component(module('auth.pages.AuthForbiddenPage'), { view });
};
