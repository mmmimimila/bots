// import './layouts/init';

// import resetcss from '@lskjs/typo/resetcss';
import BaseUappModule from '@lskjs/uapp';
// import { injectGlobal } from '@emotion/css';
import get from 'lodash/get';

import pages from './pages';
import routes from './routes';
import stores from './stores';

// injectGlobal(resetcss());

export default class UappModule extends BaseUappModule {
  debug = 1;
  async init() {
    await super.init();
    this.app = this;
  }
  async getModules() {
    return {
      ...(await super.getModules()),
      i18: () => import('@lskjs/i18/client'),
      upload: () => import('@lskjs/upload/client'),
      auth: () => import('@lskjs/auth/client'),
      permit: () => import('@lskjs/permit/client'),
      grant: () => import('@lskjs/grant/client'),
      // @lskjs/module/items
      stores: [() => import('./asyncItems'), { items: stores }],
      pages: [() => import('./asyncItems'), { items: pages }],
    };
  }

  async initGrant() {
    const grant = await this.module('grant');
    grant.cache = await grant.getCache(['cabinet.access', 'cabinet.verifyAccess', 'admin.access']);
  }

  async provide() {
    return {
      ...(await super.provide()),
      // grant: this.grant,
      grant: {
        cache: {
          can: () => true,
        },
      },
      i18: {
        t: (a) => a,
      },
      t: (a) => a,
      // session: get(this, 'modules.auth.store.session'),
      // auth: get(this, 'modules.auth.store'),
      // grant: get(this, 'modules.grant'),
      // upload: get(this, 'modules.upload'),
    };
  }
  getRoutes() {
    return {
      ...super.getRoutes(),
      ...routes,
    };
  }
  async run() {
    await super.run();
    // await this.initGrant();
  }
}
