import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@lskjs/grid';
import MainLayout from '../MainLayout';

const CabinetLayout = ({ children }) => (
  <MainLayout>
    <Container>{children}</Container>
  </MainLayout>
);

CabinetLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default CabinetLayout;
