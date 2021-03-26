import React from 'react';
import PropTypes from 'prop-types';
import { Form, FastField } from 'formik';
import T from '@lskjs//t';
import Button from '@lskjs/button';
import FormSubmit from '@lskjs/form/FormSubmit';

const ChangeEmailFormView = ({ control, status, errors, onClose }) => {
  return (
    <>
      <T name="changeEmailModal.subtitle" />
      <Form className="ant-form ant-form-vertical">
        <FastField {...control('email')} placeholder="Введите новый email" />
        <FastField {...control('password')} placeholder="Введите текущий пароль" />
        <FormSubmit status={status} errors={errors}>
          <T name="Отправить" />
        </FormSubmit>
        <Button
          onClick={() => {
            if (onClose) onClose();
          }}
          paint="primary"
          view="text"
          style={{ marginLeft: 8 }}
        >
          <T name="Отмена" />
        </Button>
      </Form>
    </>
  );
};

ChangeEmailFormView.propTypes = {
  control: PropTypes.func,
  status: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  errors: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  onClose: PropTypes.func,
};

ChangeEmailFormView.defaultProps = {
  control: null,
  status: null,
  errors: null,
  onClose: null,
};
