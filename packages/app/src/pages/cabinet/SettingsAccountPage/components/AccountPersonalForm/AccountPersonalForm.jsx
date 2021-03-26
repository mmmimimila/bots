// import React from 'react';
import createForm from '@lskjs/form/createForm';
import Input from '@lskjs/form/controls/Input';
import FormGroup from '@lskjs/form/FormGroup';
import PhoneInput from '@lskjs/form/controls/PhoneInput';
// import T from '@lskjs//t';
import AccountPersonalFormView from './AccountPersonalFormView';

const expression = /^[^\s][-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gi;
const regex = new RegExp(expression);

export default createForm({
  withI18: true,
  FormGroup,
  view: AccountPersonalFormView,
  controls: {
    name: {
      component: Input,
      title: 'registrationView.name.title',
    },
    'info.position': {
      component: Input,
      title: 'settingsAccount.personal.position',
    },
    'info.phone': {
      component: PhoneInput,
      defaultBehavior: true,
      title: 'settingsAccount.personal.phone',
    },
    'info.socialNetwork': {
      component: Input,
      title: 'Facebook/Linkedin',
      placeholder: 'linkedin.com/in/john-doe-123456789',
      regex: /[^\s]+/,
      checkValid: (_, values) => {
        if (values.info.socialNetwork) {
          if (values.info.socialNetwork.match(regex)) return '';
          return 'errors.signup.socialNetwork';
        }
        return '';
      },
    },
  },
});
