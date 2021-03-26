import React from 'react';
import Story from '@lskjs/dev/Story';
import UserItem from './UserItem';

export default ({ storiesOf }) =>
  storiesOf('dashboard/ui/UserItem', module).add('default', () => (
    <Story>
      <UserItem
        user={{
          id: 1,
          avatar: 'http://placeimg.com/32/32/people',
          title: 'Igor SuvorovZ',
        }}
      />
    </Story>
  ));
