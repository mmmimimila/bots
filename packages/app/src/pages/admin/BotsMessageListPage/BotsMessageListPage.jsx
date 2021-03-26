/* eslint-disable react/jsx-fragments */
import React from 'react';
import { observer } from '@lskjs/uapp/mobx-react';
import List from '@lskjs/list';
import Page from '@lskjs/page';
import BotsMessageListItem from './BotsMessageListItem';
import BotsMessageListHeaderItem from './BotsMessageListHeaderItem';
import BotsMessageListFilterForm from './BotsMessageListFilterForm';

// https://css-tricks.com/snippets/css/complete-guide-grid/
export const createColumns = () => ({
  1200: [100, 180, 180, 'minmax(200px, 1500px)', 70],
  992: [56, 180, 180, 'minmax(200px, 400px)', 64],
  768: [56, 48, 120, 'minmax(200px, 500px)', 64],
  570: [56, null, 48, 'minmax(100px, 300px)', 64],
  0: [56, null, null, 'minmax(100px,260px)', 56],
});

export const BotsMessageListPage = ({ listStore, itemProps }) => (
  <Page layout={Page.AdminLayout}>
    <Page.Header />
    <Page.Body>
      <List
        show={{ download: 0, more:0, search: 0 }}
        listStore={listStore}
        FilterForm={BotsMessageListFilterForm}
        Item={BotsMessageListItem}
        HeaderItem={BotsMessageListHeaderItem}
        columns={createColumns()}
        itemProps={itemProps}
      />
    </Page.Body>
  </Page>
);

export default observer(BotsMessageListPage);
