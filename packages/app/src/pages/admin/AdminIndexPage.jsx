import React from 'react';
import T from '@lskjs/t';
import Button from '@lskjs/button';
import Link from '@lskjs/link';
import Page from '@lskjs/page';

export const AdminPage = () => (
  <Page layout={Page.AdminLayout}>
    <Page.Header />
    <Page.Body>
      {/* <Button componentClass={Link} href="/admin/users" block paint="primary">
        <T name="pages.adminUsers.title" />
      </Button>
      <Button componentClass={Link} href="/admin/companies" block paint="primary">
        <T name="pages.adminCompany.title" />
      </Button>
      <Button componentClass={Link} href="/admin/companies/users" block paint="primary">
        <T name="pages.adminCompanyUser.title" />
      </Button> */}
      <Button componentClass={Link} href="/admin/bots/messages" block paint="primary">
        <T name="pages.botsMessages.title" />
      </Button>
    </Page.Body>
  </Page>
);

export default AdminPage;
