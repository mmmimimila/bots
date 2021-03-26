/* eslint-disable indent */
import BaseTemplate from './BaseTemplate';

export default class AuthCodeTemplate extends BaseTemplate {
  testProps = {
    code: 1234,
  };

  getSubject() {
    return this.t('mailer.authCode.subject', this.props);
  }

  render() {
    // return this.props.code;
    // console.log('this.props', this.props);
    return `
      ${this.header()}
      ${this.content(`
        ${this.title(this.t('mailer.authCode.title', this.props))}
        ${this.text(this.t('mailer.authCode.text', this.props))}
        ${this.text(this.props.code)}
        ${this.buttonWithLink(this.t('mailer.authCode.button', this.props), {
          href: this.props.link,
        })}
      `)}
      ${this.footer()}
    `;
  }
}
