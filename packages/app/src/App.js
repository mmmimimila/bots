/* eslint-disable max-classes-per-file */
import BaseServerApp from '@lskjs/server/ServerApp';

import Api from './Api';
import models from './models';
import events from './modules/event/events';
import mailerTemplates from './modules/mailer/templates';

export default class App extends BaseServerApp {
  getStatics() {
    return {
      ...super.getStatics(),
      '/storage': this.serverConfig.storage,
    };
  }
  healthchecks() {
    return {
      nodejs: () => true,
      db: () => false,
      // const UserModel = this.app.model('UserModel')
      // await this.app.model('UserModel').findOne({}).select('_id')
    };
  }

  getModules() {
    return {
      ...super.getModules(),
      models: [() => import('@lskjs/db/models'), { models }],
      webserver: [() => import('@lskjs/server/lskjs/webserver/server'), { Api }],
      auth: () => import('@lskjs/auth/server'),
      // permit: () => import('@lskjs/permit/server'),
      // upload: () => import('@lskjs/upload/server'),
      // mailer: [() => import('@lskjs/mailer/server'), { templates: mailerTemplates }],
      // grant: () => import('@lskjs/grant/server'),
      // event: [() => import('@lskjs/event/server'), { events }],
      reactApp: () => [
        import('@lskjs/reactapp/server'),
        {
          modules: {
            uapp: () => import('./Uapp'),
          },
        },
      ],
      bots: () => [
        import('@lskjs/bots'),
        {
          plugins: {
            // imported by default
            // debug: () => import('@lskjs/bots/plugins/DebugBotPlugin'), // [() => import('@lskjs/bots/plugins/DebugBotPlugin'), { config: { save: !__DEV__ } }],

            // Comunity plugins
            debug: () => import('@lskjs/bots-plugin-debug'),
            menu: () => import('@lskjs/bots-plugin-menu'),
            download: () => import('./lskjs/bots-plugin-download'),
            likes: () => import('@lskjs/bots-plugin-likes'),
            portal: () => import('@lskjs/bots-plugin-portal'),
            qiwi: () => import('./lskjs/bots-plugin-qiwi'),
            // bratishka: () => import('./lskjs/bots-plugin-bratishka'),
            // changelog: () => import('./lskjs/bots-plugin-changelog'),
            // happybd: () => import('./lskjs/bots-plugin-happybd'),
            // moderator: () => import('./lskjs/bots-plugin-moderator'),
            // polundra: () => import('./lskjs/bots-plugin-polundra'),
            // songs: () => import('./lskjs/bots-plugin-songs'),
            // wakeup: () => import('./lskjs/bots-plugin-wakeup'),
            // notify: () => import('./lskjs/bots-plugin-notify'),

            // Local plugins
            // cats: () => import('./modules/bots/plugins/CatsPlugin'),
            // counter: () => import('./modules/bots/plugins/CounterPlugin'),
            // deathLetter: () => import('./modules/bots/plugins/DeathLetterPlugin'),
          },
        },
      ],
    };
  }

  async init() {
    await super.init();
    // this.models = await this.module('models');
    // this.model = this.models.model;

    // this.module('models.UserName')
    // this.models = await createModels({
    //   UserModel
    // })
    // this.reactApp = await this.module('reactApp');
    // this.bots = await this.module('bots');
    // console.log('bots.config', bots.config);
    // console.log('bots.bots', bots.bots);
  }

  async run() {
    await super.run();
    await this.module('bots');
    // await this.module('*');
    // await this.started();
    // const models = await this.module('models');
    // this.model = models.model.bind(models);

    // const NewUserModel = this.model('NewUserModel');

    // const newUser = await NewUserModel.findOne();
    // this.log.log({ newUser });

    // const UserModel = await this.module('models.User');
    // this.log.log({UserModel})
    // const user = await UserModel.findOne();
    // this.log.log({user})

    // this.log.log('log');
    // this.log.trace('trace');
    // this.log.debug('debug');
    // this.log.info('info');
    // this.log.warn('warn');
    // this.log.error('error');
    // this.log.fatal('fatal');
  }
}

// https://t.me/lskitbot?start=123123
// https://t.me/lskitbot?startgroup=123123
