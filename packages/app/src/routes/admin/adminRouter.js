import asyncAction from '@lskjs/utils/asyncAction';
import getAuthRedirectUrl from '@lskjs/auth/utils/getAuthRedirectUrl';
import Page from '@lskjs/page';

export default {
  async action({ next, page, i18, grant, req }) {
    if (!grant.cache.can('cabinet.access')) return page.redirect(getAuthRedirectUrl(req));
    if (!grant.cache.can('cabinet.verifyAccess')) return page.redirect(getAuthRedirectUrl(req, '/auth/forbidden'));
    if (!grant.cache.can('admin.access')) return page.redirect(getAuthRedirectUrl(req, '/cabinet/forbidden'));
    return page
      .meta({
        title: i18.t('pages.admin.title'),
        url: '/admin',
      })
      .next(next)
      .catch((err) => page.component(import('../../pages/common/ErrorPage'), { err, layout: Page.AdminLayout }));
  },
  children: [
    {
      path: '',
      action: asyncAction(() => import('./adminIndexAction')),
    },
    {
      path: '/bots',
      children: [
        {
          path: '',
          action: asyncAction(() => import('./bots/botsIndexAction')),
        },
        {
          path: '/messages',
          action: asyncAction(() => import('./bots/botsMessageListAction')),
        },
        {
          path: '/chat',
          action: asyncAction(() => import('./bots/botsChatAction')),
        },
      ],
    },
  ],
};
