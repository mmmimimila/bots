/* eslint-disable react/jsx-fragments */
import List from '@lskjs/list';
import Page from '@lskjs/page';
import T from '@lskjs/t';
import { inject, observer } from '@lskjs/uapp/mobx-react';
import Icon from 'antd/lib/icon';
import React from 'react';

import AdminUserListHeaderItem from './AdminUserListHeaderItem';
import AdminUserListItem from './AdminUserListItem';
import AdminUserListPageFilterForm from './AdminUserListPageFilterForm';

// const config = {
//   order: ['checkbox', 'name', 'actions'],
//   columns: {
//     name: {
//       width: '1fr',
//       priority: 1,
//       hide: { xs: true },
//     },
//   },
// };

export const createColumns = () => [20, 'minmax(110px,1fr)', '0.3fr', 110, 110, 120, 180];

// export const createColumns = ({ selectable }) => autoDimentions([
//   selectable ? 20 : null,
//   'minmax(110px,2fr)',
//   115,
//   115,
//   115,
//   'minmax(105px,0.5fr)',
//   selectable ? null : 'minmax(36px,180px)',
// ], [
//   0, 0, 1, 1, 1, 0, 0,
// ], 600);

const tabs = [
  {
    key: 'all',
    href: '/admin/users',
    children: (
      <React.Fragment>
        <Icon type="team" />
        <T name="admin.allUsers" />
      </React.Fragment>
    ),
  },
  {
    key: 'new',
    href: '/admin/users/new',
    children: (
      <React.Fragment>
        <Icon type="team" />
        <T name="admin.newUsers" />
      </React.Fragment>
    ),
  },
  {
    key: 'owners',
    href: '/admin/users/owners',
    children: (
      <React.Fragment>
        <Icon type="team" />
        <T name="admin.ownersInvestors" />
      </React.Fragment>
    ),
  },
  {
    key: 'professionals',
    href: '/admin/users/professionals',
    children: (
      <React.Fragment>
        <Icon type="team" />
        <T name="admin.professionals" />
      </React.Fragment>
    ),
  },
];

// tabs={tabs} tab={tab}
export const AdminUserListPage = ({ listStore, tab, selectable, itemProps }) => (
  <Page layout={Page.AdminLayout}>
    <Page.Header />
    <Page.Body>
      <List
        listStore={listStore}
        columns={createColumns({ selectable })}
        HeaderItem={AdminUserListHeaderItem}
        FilterForm={AdminUserListPageFilterForm}
        Item={AdminUserListItem}
        itemProps={itemProps}
      />
    </Page.Body>
  </Page>
);

export default observer(AdminUserListPage);
