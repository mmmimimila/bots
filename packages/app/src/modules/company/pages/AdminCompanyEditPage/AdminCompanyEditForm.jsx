import React from 'react';
import { Form, FastField } from 'formik';
import PropTypes from 'prop-types';
import Button from '@lskjs/button';
import ButtonGroup from '@lskjs/button/ButtonGroup';
import T from '@lskjs/t';
import sure from '@lskjs/modal/hoc/sure';
import FormSubmit from '@lskjs/form/FormSubmit';
import Input from '@lskjs/form/controls/Input';
import Textarea from '@lskjs/form/controls/Textarea';
import createForm from '@lskjs/form/createForm';

const SureModal = sure();

export const AdminCompanyEditFormView = ({ control, type, onRemove, status, errors }) => (
  <Form className="ant-form ant-form-vertical">
    <FastField {...control('title')} />
    <FastField {...control('description')} />
    <FormSubmit status={status} errors={errors}>
      <T name={type === 'create' ? 'buttons.create' : 'buttons.save'} />
    </FormSubmit>
    <ButtonGroup padded>
      {type === 'edit' && (
        <SureModal
          title={<T name="company.deleteCompany" />}
          content={<T name="company.sureDeleteCompany" />}
          onSubmit={onRemove}
        >
          <Button paint="danger">
            <T name="company.deleteCompany" />
          </Button>
        </SureModal>
      )}
      <Button paint="danger" view="text" bordered>
        <T name="company.changeOwner" />
      </Button>
    </ButtonGroup>
  </Form>
);

AdminCompanyEditFormView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  controls: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default createForm({
  withI18: true,
  view: AdminCompanyEditFormView,
  controls: {
    title: {
      component: Input,
      title: 'companies.formTitleTitle',
      placeholder: 'companies.formTitlePlaceholder',
      required: true,
      maxLength: 150,
    },
    description: {
      component: Textarea,
      title: 'companies.formPositionOwner',
      placeholder: 'companies.formPositionOwnerPlaceholder',
      required: true,
      maxLength: 150,
    },
  },
});
