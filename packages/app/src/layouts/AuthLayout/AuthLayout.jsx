import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@lskjs/grid';
import MainLayout from '../MainLayout';
import Slide from './Slide';

const AuthLayout = ({ children }) => (
  <MainLayout view="auth">
    <Slide>
      <Container>
        <div style={{ background: 'white', padding: 30 }}>{children}</div>
      </Container>
    </Slide>
  </MainLayout>
);

AuthLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default AuthLayout;
