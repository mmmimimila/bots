import React from 'react';
import PropTypes from 'prop-types';
import If from 'react-if';
import styled from '@emotion/styled';
import { Form, Field } from 'formik';
import { Row, Col } from '@lskjs/grid';
// import DEV from '@lskjs/dev/DEV';
import Disabled from '@buzzguru/ui/Disabled';
import FormSubmit from '@lskjs/form/FormSubmit';
import FormSubmitError from '@lskjs/form/FormSubmitError';
import T from '@lskjs//t';
// import Button from '@lskjs/button';
// import ButtonsCardWrapper from '../../../../components/ButtonsCardWrapper';

const PhoneWrapper = styled('div')`
  .react-tel-input .form-control {
    padding-top: 15px;
    padding-bottom: 15px;
    outline: none !important;
    &:focus {
      outline: none !important;
    }
  }
  > *:focus-within {
    .react-tel-input .form-control {
      border-color: #7070ff !important;
    }
  }
`;

const AccountPersonalFormView = props => {
  const { errors, status, control, country } = props;
  const hasErrors = !!Object.keys(errors).length;
  return (
    <Form>
      <Row>
        <Col sm={6}>
          <Field {...control('name')} />
        </Col>
        <Col sm={6}>
          <Field {...control('info.position')} />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <PhoneWrapper>
            <Field {...control('info.phone')} country={country} />
          </PhoneWrapper>
        </Col>
        <Col sm={6}>
          <Field {...control('info.socialNetwork')} title="Facebook/Linkedin" />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <If condition={hasErrors}>
            <FormSubmitError status={status} errors={errors} />
          </If>
          <FormSubmit status={status} errors={errors}>
            <T name="buttons.save" />
          </FormSubmit>
          {/* <DEV>
            <FormDebug {...props} />
          </DEV> */}
        </Col>
      </Row>
      {/* <ButtonsCardWrapper> */}
      {/* <Button
          style={{ marginLeft: 8 }}
          view="text"
          paint="primary"
        >
          <T name="buttons.cancel" />
        </Button> */}
      {/* </ButtonsCardWrapper> */}
    </Form>
  );
};

AccountPersonalFormView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.array,
  status: PropTypes.string.isRequired,
  control: PropTypes.func.isRequired,
};

AccountPersonalFormView.defaultProps = {
  errors: [],
};

export default AccountPersonalFormView;
