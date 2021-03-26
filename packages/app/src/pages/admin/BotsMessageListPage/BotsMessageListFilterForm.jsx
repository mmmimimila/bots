import React from 'react';
import { Form, FastField } from 'formik';
import { Col, Row, Container } from '@lskjs/grid';
import createForm from '@lskjs/form/createForm';
import Input from '@lskjs/form/controls/Input';

const BotsListPageFilterFormView = ({ control }) => (
  <Form>
    <Container>
      <Row>
        <Col md={6}>
          <FastField {...control('UserId')} />
        </Col>
        <Col md={6}>
          <FastField {...control('telegramChatId')} />
        </Col>
      </Row>
    </Container>
  </Form>
);

const BotsListPageFilterForm = createForm({
  view: BotsListPageFilterFormView,
  withI18: true,
  controls: {
    telegramUserId: {
      component: Input,
      title: 'form.telegramUserId.title',
      placeholder: 'form.telegramUserId.placeholder',
      format: Number,
    },
    telegramChatId: {
      component: Input,
      title: 'form.telegramChatId.title',
      placeholder: 'form.telegramChatId.placeholder',
      format: Number,
    },
  },
});

export default BotsListPageFilterForm;
