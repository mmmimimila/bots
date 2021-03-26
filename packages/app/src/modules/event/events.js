export default {
  'events.auth.restorePassword': async ({ event, permit, userId, link }) => {
    const { UserModel } = this.app.models;
    const user = await UserModel.findById(userId);
    if (!user) throw '!user';
    const mailer = await this.app.module('mailer');
    await mailer
      .sendTo(
        { user },
        {
          template: 'RestorePasswordTemplate',
          props: {
            user,
            link,
            code: permit.code,
          },
        },
      )
      .catch((err) => this.log.error(`${event}/mailer.sendTo`, err));
  },
  'events.auth.signup': async ({ event, userId }) => {
    const { UserModel } = this.app.models;
    const user = await UserModel.findById(userId);
    if (!user) throw '!user';
    const [mailer, notifyLogger] = await this.app.module(['mailer', 'notifyLogger']);
    await mailer
      .sendTo(
        { user },
        {
          template: 'signup',
          props: {
            user,
          },
        },
      )
      .catch((err) => this.log.error(`${event}/mailer.sendTo`, err));
    await notifyLogger.log(`New user: ${user.name}`);
    // notifyLogger.log(this.i18.t('emails.signupAdmin.text', { user }));
  },
};
