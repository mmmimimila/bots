import React, { Component } from 'react';
import { inject, observer } from '@lskjs/uapp/mobx-react';
import T from '@lskjs/t';
import { HeaderRow, HeaderCol, createIndex } from '@lskjs/list/Table';
import List from '~/lskjs/list';
import Page from '../../components/molecules/Page';
import Item from './AdminCompanyUserItem';

export const columns = ['minmax(90px,1fr)', 'minmax(90px,1fr)', '0.51fr', '0.51fr', 80];
export const HeaderItem = ({ toggleSort, sort = {} }) => {
  const index = createIndex();
  return (
    <HeaderRow>
      <HeaderCol index={index()}>
        <T name="companies.routerCompany" />
      </HeaderCol>
      <HeaderCol index={index()}>
        <T name="admin.user" />
      </HeaderCol>
      <HeaderCol index={index()}>
        <List.SortHeader value={sort.updatedAt} onClick={() => toggleSort('updatedAt')}>
          <T name="admin.lastUpdatedDate" />
        </List.SortHeader>
      </HeaderCol>
      <HeaderCol index={index()}>
        <T name="company.position" />
      </HeaderCol>
      <HeaderCol index={index()}>
        <T name="admin.actions" />
      </HeaderCol>
    </HeaderRow>
  );
};

@inject('uapp')
@observer
class AdminCompanyUserListPage extends Component {
  constructor(props) {
    super(props);
    Item.listStore = props.listStore;
  }
  render() {
    const { uapp, listStore } = this.props;
    return (
      <Page container>
        <Page.Header />
        <Page.Body>
          <List
            listStore={listStore}
            columns={columns}
            HeaderItem={HeaderItem}
            Item={Item}
            show={{ filterButton: false }}
            itemProps={{
              onUappError: uapp.onError,
            }}
          />
        </Page.Body>
      </Page>
    );
  }
}

export default AdminCompanyUserListPage;
