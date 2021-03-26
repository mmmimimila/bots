import React from 'react';
import PropTypes from 'prop-types';
import { ItemRow, ItemCol, createIndex } from '@lskjs/list/Table';
import List from '@lskjs/list';
import DateTime from '../../../lskjs/ui2/DateTime';
import UserItem from '../../../lskjs/ui2/UserItem';
import Message from '../../../lskjs/ui2/MessageItem';

const BotsMessageListItem = ({ item = {}, index = createIndex() }) => (
  <List.SelectRow item={item}>
    <ItemRow>
      <ItemCol index={index()}>{item.message_id}</ItemCol>
      <ItemCol index={index()}>
        {item.chat && (
          <UserItem
            Tag="div"
            id={item.chat.id}
            avatar={`https://randomuser.me/api/portraits/lego/${Math.abs(item.chat.id) % 7}.jpg`}
            title={item.chat.title}
            subtitle={item.chat.type}
          />
        )}
      </ItemCol>
      <ItemCol index={index()}>
        <UserItem
          Tag="div"
          id={item.from.id}
          avatar={`https://randomuser.me/api/portraits/men/${item.from.id % 41}.jpg`}
          title={[item.from.first_name, item.from.last_name].filter(Boolean).join(' ')}
          subtitle={item.from.username && `@${item.from.username}`}
        />
      </ItemCol>
      <ItemCol index={index()}>
        <Message item={item} />
      </ItemCol>
      <ItemCol index={index()}>
        <DateTime value={item.date * 1000} />
      </ItemCol>
    </ItemRow>
  </List.SelectRow>
);

BotsMessageListItem.propTypes = {
  index: PropTypes.func.isRequired,
  item: PropTypes.objectOf(Object).isRequired,
};

export default BotsMessageListItem;
