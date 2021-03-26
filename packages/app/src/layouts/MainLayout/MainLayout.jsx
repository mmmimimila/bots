import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../Layout';
import MainLayoutNavbar from './MainLayoutNavbar';
import LayoutServices from './LayoutServices';

const MainLayout = ({ view, children }) => (
  <Layout>
    <Layout.Wrapper>
      <Layout.Header>
        <MainLayoutNavbar view={view} />
      </Layout.Header>
      <Layout.Body>{children}</Layout.Body>
    </Layout.Wrapper>
    <LayoutServices />
  </Layout>
);

MainLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default MainLayout;
