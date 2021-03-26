import React from 'react';
import PropTypes from 'prop-types';
import { observer } from '@lskjs/uapp/mobx-react';
import Page from '@lskjs/page';
import AdminCompanyEditForm from './AdminCompanyEditForm';

const AdminCompanyEditPage = ({ item, type, onSubmit, onRemove }) => {
  return (
    <Page layout={Page.AdminLayout}>
      <Page.Title />
      <Page.Breadcrumbs />
      <Page.Body>
        <AdminCompanyEditForm
          type={type}
          initialValues={item ? item.toJS() : {}}
          onRemove={onRemove}
          onSubmit={onSubmit}
        />
      </Page.Body>
    </Page>
  );
};
AdminCompanyEditPage.propTypes = {
  item: PropTypes.object,
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
AdminCompanyEditPage.defaultProps = {
  item: null,
  type: 'create',
};

export default observer(AdminCompanyEditPage);
