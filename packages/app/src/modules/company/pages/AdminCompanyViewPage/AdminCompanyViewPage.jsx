import React from 'react';
// import PropTypes from 'prop-types';
import { observer } from '@lskjs/uapp/mobx-react';
import Page from '@lskjs/page';

const AdminCompanyViewPage = ({ item, type, onSubmit, onRemove }) => {
  return (
    <Page layout={Page.AdminLayout}>
      <Page.Title />
      <Page.Breadcrumbs />
      <Page.Body>AdminCompanyViewPage</Page.Body>
    </Page>
  );
};

export default observer(AdminCompanyViewPage);
