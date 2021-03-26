/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-vars */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import T from '@lskjs//t';
import Button from '@lskjs/button';
import FormDebug from '@lskjs/form/FormDebug';
import FormSubmitError from '@lskjs/form/FormSubmitError';
import { Col, Row } from '@lskjs/grid';
import { Field, Form } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import If from 'react-if';

import ChangeEmailModal from './ChangeEmailModal';
import ChangePasswordModal from './ChangePasswordModal';

const dividerStyle = css`
  > div {
    margin-right: -16px;
    margin-left: -16px;
  }
`;

const radioStyle = css`
  width: 100%;
  &:first-of-type {
    padding-left: 0;
  }
`;

const radioWrapperStyle = css`
  display: flex;
  > div {
    &:not(:last-of-type) {
      margin-right: 15px;
    }
  }
  @media screen and (max-width: 767px) {
  }
`;

const SettingsFormView = (props) => {
  const { errors, status, control, updatePassword, updateEmail, passwordUpdatedAt } = props;
  const hasErrors = !!Object.keys(errors).length;
  return (
    <Form>
      <Row style={{ alignItems: 'center' }}>
        <>
          <Col sm={12} css={dividerStyle} />
          <Col sm={6}>
            <Field {...control('email')} />
            <ChangeEmailModal updateEmail={updateEmail}>
              <Button
                paint="primary"
                view="empty"
                size="small"
                style={{
                  position: 'absolute',
                  bottom: 29,
                  right: 20,
                }}
              >
                Изменить
              </Button>
            </ChangeEmailModal>
          </Col>
          <Col sm={6} />
          <Col sm={12} css={dividerStyle} />
        </>
        <Col sm={6}>
          <Field
            {...control('password')}
            info={
              passwordUpdatedAt && (
                <T name="Последнее изменение {{-date}}" date={moment(passwordUpdatedAt).format('DD.MM.YYYY, HH:mm')} />
              )
            }
          />
          <ChangePasswordModal updatePassword={updatePassword}>
            <Button
              paint="primary"
              view="empty"
              size="small"
              style={{
                position: 'absolute',
                bottom: 29,
                right: 20,
              }}
            >
              <T name="Изменить" />
            </Button>
          </ChangePasswordModal>
        </Col>
        <Col sm={6} />
        <Col sm={12}>
          <If condition={hasErrors}>
            <FormSubmitError status={status} errors={errors} />
          </If>
        </Col>
      </Row>
    </Form>
  );
};

SettingsFormView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.array,
  status: PropTypes.string.isRequired,
  control: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  passwordUpdatedAt: PropTypes.string,
};

SettingsFormView.defaultProps = {
  errors: [],
  passwordUpdatedAt: null,
};

export default SettingsFormView;
