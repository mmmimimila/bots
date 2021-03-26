import Page from '@lskjs/page';
import asyncAction from '@lskjs/utils/asyncAction';

export default {
  async action({ next, page, t }) {
    // const ErrorPage = await app.module('pages.ErrorPage');
    return page
      .meta({
        title: t('pages.auth.title'),
        url: '/auth',
      })
      .next(next)
      .catch((err) => page.component(import('../../pages/common/ErrorPage'), { err, layout: Page.AuthLayout }));
  },
  children: [
    {
      path: '',
      action: ({ page }) => page.redirect('/auth/login'),
    },
    {
      path: '/login',
      action: asyncAction(() => import('./authLoginAction')),
    },
    {
      path: '/forbidden',
      action: asyncAction(() => import('./authForbiddenAction')),
    },
    {
      path: '/logout',
      action: asyncAction(() => import('./authLoginAction')),
    },
  ],
};
