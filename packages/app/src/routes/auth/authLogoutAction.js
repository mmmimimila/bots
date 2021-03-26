export default async ({ page, app }) => {
  const auth = await app.module('auth');
  setTimeout(() => auth.logout(), 100);
  return page
    .meta({
      title: 'pages.authLogout.title',
      url: '/auth/logout',
    })
    .component(app.module('auth.pages.AuthLogoutPage'));
};
