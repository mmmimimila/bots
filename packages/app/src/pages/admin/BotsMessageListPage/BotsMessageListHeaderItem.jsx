import React from 'react';
import PropTypes from 'prop-types';
import List from '@lskjs/list';
import T from '@lskjs/t';
import { HeaderRow, HeaderCol, createIndex } from '@lskjs/list/Table';

const BotsMessageListHeaderItem = ({ toggleSort, sort = {}, index = createIndex() }) => (
  <HeaderRow>
    <HeaderCol index={index()}>
      <T name="telegramMessage.messageId" />
    </HeaderCol>
    <HeaderCol index={index()}>
      <T name="telegramMessage.chat" />
    </HeaderCol>
    <HeaderCol index={index()}>
      <T name="telegramMessage.user" />
    </HeaderCol>
    <HeaderCol index={index()}>
      <T name="telegramMessage.text" />
    </HeaderCol>
    <HeaderCol index={index()}>
      <List.SortHeader value={sort.date} onClick={() => toggleSort('date')}>
        <T name="telegramMessage.date" />
      </List.SortHeader>
    </HeaderCol>
  </HeaderRow>
);

BotsMessageListHeaderItem.propTypes = {
  toggleSort: PropTypes.func.isRequired,
  sort: PropTypes.objectOf(Object).isRequired,
  index: PropTypes.func.isRequired,
};

export default BotsMessageListHeaderItem;
