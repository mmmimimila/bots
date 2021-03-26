import React from 'react';
import { Col, Row } from '@lskjs/grid';
import { Form, FastField } from 'formik';
import createForm from '@lskjs/form/createForm';
import FormDebug from '@lskjs/form/FormDebug';
import FormSubmit from '@lskjs/form/FormSubmit';
import T from '@lskjs/t';
import Input from '@lskjs/form/controls/Input';
import Textarea from '@lskjs/form/controls/Textarea';
import Image from '@lskjs/form/controls/Image';
import Page from '@lskjs/page';

const UserEditFormView = ({ control, status, errors, ...props }) => (
  <Form className="ant-form ant-form-vertical">
    <Row>
      <Col md={9}>
        <FastField {...control('name')} />
        <FastField {...control('info.description')} />
      </Col>
      <Col md={3}>
        <FastField {...control('avatar')} />
      </Col>
    </Row>
    {__DEV__ && <FormDebug status={status} errors={errors} {...props} />}
    <FormSubmit block status={status} errors={errors}>
      <T name="buttons.save" />
    </FormSubmit>
  </Form>
);

const UserEditForm = createForm({
  withI18: true,
  view: UserEditFormView,
  pick: false,
  controls: {
    name: {
      component: Input,
      title: 'UserEditForm.name',
      required: true,
    },
    'info.description': {
      component: Textarea,
      title: 'UserEditForm.infoDescription',
    },
    avatar: {
      title: 'UserEditForm.avatar',
      component: Image,
      type: 'image',
    },
  },
});

export default ({ onSubmit, values }) => (
  <Page layout={Page.CabinetLayout}>
    <Page.Header />
    <Page.Body>
      <UserEditForm onSubmit={onSubmit} initialValues={values} />
    </Page.Body>
  </Page>
);
