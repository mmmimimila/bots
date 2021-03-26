/* eslint-disable global-require */
import Page from '@lskjs/page';
import Err from '@lskjs/utils/Err';

export default {
  path: '',
  async action({ next, page }) {
    return page
      .next(next)
      // .catch((err) => page.component(import('../pages/common/ErrorPage'), { err, layout: Page.CabinetLayout }));
  },
  children: [
    {
      path: '',
      ...require('./home').default,
    },
    {
      path: '/auth',
      ...require('./auth').default,
    },
    {
      path: '/cabinet',
      ...require('./cabinet').default,
    },
    // {
    //   path: '/admin',
    //   ...require('./admin').default,
    // },
    // {
    //   path: '(.*)',
    //   action({ path }) {
    //     throw new Err('E_404', {
    //       status: 404,
    //       message: `Not found path ${path}`,
    //       path,
    //     });
    //   },
    // },
    {
      path: '(.*)',
      action({ page, req }) {
        return page.component(import('../pages/home/EmptyPage'), { req });
      },
    },
  ],
};
