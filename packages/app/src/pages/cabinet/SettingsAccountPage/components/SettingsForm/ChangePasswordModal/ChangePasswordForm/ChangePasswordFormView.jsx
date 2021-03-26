import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from '@lskjs/uapp/mobx-react';
import { Form, FastField } from 'formik';
import T from '@lskjs//t';
import Button from '@lskjs/button';
import FormSubmit from '@lskjs/form/FormSubmit';

const ChangePasswordFormView = ({ control, status, errors, i18, onClose }) => (
  <>
    <Form className="ant-form ant-form-vertical">
      <FastField {...control('password')} placeholder={i18.t('Введите текущий пароль')} />
      <FastField {...control('newPassword')} placeholder={i18.t('Введите новый пароль')} />
      <FormSubmit status={status} errors={errors}>
        <T name="Отправить" />
      </FormSubmit>
      <Button
        paint="primary"
        view="text"
        onClick={() => {
          if (onClose) onClose();
        }}
        style={{ marginLeft: 8 }}
      >
        <T name="Отмена" />
      </Button>
    </Form>
  </>
);

ChangePasswordFormView.propTypes = {
  control: PropTypes.func,
  status: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  errors: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  i18: PropTypes.objectOf(Object).isRequired,
  onClose: PropTypes.func,
};

ChangePasswordFormView.defaultProps = {
  control: null,
  status: null,
  errors: null,
  onClose: null,
};

export default inject('i18')(observer(ChangePasswordFormView));
