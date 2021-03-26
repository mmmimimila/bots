import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import T from '@lskjs/t';
import List from '@lskjs/list';
import { HeaderRow, HeaderCol, createIndex } from '@lskjs/list/Table';

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

const AdminUserListHeaderItem = ({ toggleSort, sort = {}, index = createIndex() }) => (
  <HeaderRow>
    <HeaderCol index={index()}>
      <List.Checkbox global />
    </HeaderCol>
    <HeaderCol index={index()}>
      <T name="admin.name" />
    </HeaderCol>
    <HeaderCol index={index()}>
      <T name="admin.role" />
    </HeaderCol>
    <HeaderCol index={index()}>
      <List.SortHeader value={get(sort, 'createdAt')} onClick={() => toggleSort('createdAt')}>
        <T name="admin.createdAt" />
      </List.SortHeader>
    </HeaderCol>
    <HeaderCol index={index()}>
      <List.SortHeader value={get(sort, 'dates.visitedAt')} onClick={() => toggleSort('dates.visitedAt')}>
        <T name="admin.visitedAt" />
      </List.SortHeader>
    </HeaderCol>
    <HeaderCol index={index()} style={{ marginLeft: 8 }}>
      <T name="admin.status" />
    </HeaderCol>
    <HeaderCol index={index()}>
      {/* <Query
        match={{
          type: 'screen',
          minWidth: 945,
        }}
      > */}
      <T name="admin.actions" />
    </HeaderCol>
  </HeaderRow>
);

AdminUserListHeaderItem.propTypes = {
  toggleSort: PropTypes.func.isRequired,
  sort: PropTypes.objectOf(Object).isRequired,
  index: PropTypes.func.isRequired,
};

export default AdminUserListHeaderItem;
