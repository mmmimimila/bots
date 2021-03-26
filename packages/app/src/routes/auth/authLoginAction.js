export default async ({ page, app, grant, req }) => {
  const redirect = req.query.r || '/cabinet';
  if (grant.cache.can('cabinet.access')) return page.redirect(redirect);
  const auth = await app.module('auth');
  const AuthStore = await app.module('auth.stores.AuthStore');
  const providers = await AuthStore.getProviders();
  const onSubmit = app.catchError(async (values) => {
    await auth.login(values);
    app.redirect(redirect);
  });
  const view = 'login';
  return page
    .meta({
      title: 'pages.authLogin.title',
      url: '/auth/login',
    })
    .component(app.module('auth.pages.AuthLoginPage'), { view, onSubmit, providers });
};
