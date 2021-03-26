import Input from '@lskjs/form/controls/Input';
import FormGroup from '@lskjs/form/FormGroup';
import createForm from '@lskjs/form/createForm';

import SettingsFormView from './SettingsFormView';

export default createForm({
  withI18: true,
  FormGroup,
  view: SettingsFormView,
  controls: {
    email: {
      component: Input,
      title: 'Email для авторизации',
      type: 'email',
      disabled: false,
    },
    password: {
      component: Input,
      title: 'Пароль',
      infoLeft: true,
      type: 'password',
      disabled: false,
    },
  },
});
