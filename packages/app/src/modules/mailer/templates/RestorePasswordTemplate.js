/* eslint-disable indent */
import BaseTemplate from './BaseTemplate';

export default class RestorePasswordTemplate extends BaseTemplate {
  static testProps = {
    me: {
      name: 'Igor Suvorov',
    },
    link: 'http://localhost:8080/api/mailer/dev/html/RestorePasswordTemplate',
  };

  getSubject() {
    return this.t('mailer.authRestorePassword.subject', this.props);
  }

  getText() {
    return `
${this.t('mailer.authRestorePassword.title', this.props)}
${this.t('mailer.authRestorePassword.text', this.props)}
${this.props.link}
    `;
  }

  render() {
    return `
      ${this.header()}
      ${this.content(`
        ${this.title(this.t('mailer.authRestorePassword.title', this.props))}
        ${this.text(this.t('mailer.authRestorePassword.text', this.props))}
        ${this.buttonWithLink(this.t('mailer.authRestorePassword.button'), {
          href: this.props.link,
        })}
      `)}
      ${this.footer()}
    `;
  }
}
