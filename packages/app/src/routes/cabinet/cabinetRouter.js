import getRedirectUrl from '@lskjs/auth/utils/getRedirectUrl';
import Page from '@lskjs/page';
import asyncAction from '@lskjs/utils/asyncAction';

export default {
  async action({ next, page, app, req }) {
    const grant = await app.module('grant');
    if (!grant.cache.can('cabinet.access')) return page.redirect(getRedirectUrl(req, '/auth/login'));
    if (!grant.cache.can('cabinet.verifyAccess')) return page.redirect(getRedirectUrl(req, '/auth/forbidden'));
    return page
      .meta({
        title: 'pages.cabinet.title',
        url: '/cabinet',
      })
      .next(next)
      .catch((err) => page.component(import('../../pages/common/ErrorPage'), { err, layout: Page.CabinetLayout }));
  },
  children: [
    {
      path: '',
      action: ({ page }) => page.redirect('/admin'),
    },
    {
      path: '/forbidden',
      action: asyncAction(() => import('./cabinetForbiddenAction')),
    },
  ],
};
