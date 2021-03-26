import React from 'react';
import Story from '@lskjs/dev/Story';
import SettingsForm from './SettingsForm';
// eslint-disable-next-line react/prop-types

export default ({ storiesOf }) =>
  storiesOf('form/SettingsForm', module).add('SettingsForm', () => (
    // eslint-disable-next-line react/jsx-filename-extension
    <Story>
      <SettingsForm
        initialValues={{ email: 'email', password: 'Your password here' }}
        updatePassword={updatePassword}
        updateEmail={updateEmail}
        passwordUpdatedAt="statuses.passwordAt"
      />
    </Story>
  ));
