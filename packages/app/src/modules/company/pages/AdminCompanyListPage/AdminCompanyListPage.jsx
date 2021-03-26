import T from '@lskjs/t';
import React from 'react';
import Link from '@lskjs/link';
import withResponsive from '@lskjs/button/withResponsive';
import Button from '@lskjs/button';
import Page from '@lskjs/page';
import PlusIcon from 'react-icons2/mdi/plus';
import { HeaderRow, HeaderCol, createIndex } from '@lskjs/list/Table';
import List from '@lskjs/list';
import FilterForm from './AdminCompanyListPageFilter';
import Item from './AdminCompanyListItem';

const ResponsiveButton = withResponsive(Button);

export const columns = ['minmax(60px,1fr)', 85, 108];
export const HeaderItem = ({ toggleSort, sort = {}, index = createIndex() }) => (
  <HeaderRow>
    <HeaderCol index={index()}>
      <T name="admin.object" />
    </HeaderCol>
    <HeaderCol index={index()}>
      <List.SortHeader value={sort.createdAt} onClick={() => toggleSort('createdAt')}>
        <T name="admin.creation" />
      </List.SortHeader>
    </HeaderCol>
    <HeaderCol index={index()} style={{ marginLeft: 5 }}>
      <T name="admin.actions" />
    </HeaderCol>
  </HeaderRow>
);
const getActions = () => (
  <>
    <ResponsiveButton
      componentClass={Link}
      href="/admin/companies/create"
      paint="primary"
      size="small"
      icon={<PlusIcon />}
    >
      <T name="common.create" />
    </ResponsiveButton>
  </>
);

const AdminCompanyListPage = ({ listStore }) => (
  <Page layout={Page.AdminLayout}>
    <Page.Header actions={getActions()} />
    <Page.Body>
      <List listStore={listStore} columns={columns} FilterForm={FilterForm} HeaderItem={HeaderItem} Item={Item} />
    </Page.Body>
  </Page>
);

export default AdminCompanyListPage;
