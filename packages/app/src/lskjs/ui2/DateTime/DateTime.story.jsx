import React from 'react';
import Story from '@lskjs/dev/Story';
import DateTime from './DateTime';

export default ({ storiesOf }) =>
  storiesOf('ui3/DateTime').add('default', () => (
    <Story>
      <DateTime value={Date.now()} />
    </Story>
  ));
