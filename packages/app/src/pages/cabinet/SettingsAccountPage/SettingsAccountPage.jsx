import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Page from '@lskjs/page';
import SettingsForm from './components/SettingsForm';

const SettingsAccountPage = ({ user, updatePassword, updateEmail }) => {
  return (
    <Page layout={Page.AdminLayout}>
      <Page.Header />
      <Page.Body>
        <SettingsForm
          initialValues={{ email: get(user, 'email', ''), password: 'Your password here' }}
          updatePassword={updatePassword}
          updateEmail={updateEmail}
          passwordUpdatedAt={get(user, 'statuses.passwordAt')}
        />
      </Page.Body>
    </Page>
  );
};

SettingsAccountPage.propTypes = {
  user: PropTypes.objectOf(Object),
  updatePassword: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
};

SettingsAccountPage.defaultProps = {
  user: null,
};

export default SettingsAccountPage;
