import FormGroup from '@lskjs/form/FormGroup';
import createForm from '@lskjs/form/createForm';

import Password from '@lskjs/form/controls/Password';

import ChangePasswordFormView from './ChangePasswordFormView';

export default createForm({
  withI18: true,
  FormGroup,
  view: ChangePasswordFormView,
  controls: {
    password: {
      component: Password,
      title: 'Текущий пароль',
      required: true,
      _required: false,
      type: 'password',
    },
    newPassword: {
      component: Password,
      title: 'Новый пароль',
      required: true,
      _required: false,
      type: 'password',
    },
  },
});
