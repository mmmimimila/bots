import FormGroup from '@lskjs/form/FormGroup';
import createForm from '@lskjs/form/createForm';
import Input from '@lskjs/form/controls/Input';
import Password from '@lskjs/form/controls/Password';
import ChangeEmailFormView from './ChangeEmailFormView';

export default createForm({
  FormGroup,
  view: ChangeEmailFormView,
  controls: {
    email: {
      component: Input,
      title: 'Новый Email для авторизации',
      required: true,
      _required: false,
      type: 'email',
    },
    password: {
      component: Password,
      title: 'Текущий пароль',
      required: true,
      _required: false,
      type: 'password',
    },
  },
});
