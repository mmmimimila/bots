import React from 'react';
import { DEV } from '@lskjs/ui2';
import If from 'react-if';
import MainLayout from '../MainLayout';

const ErrorLayout = ({ err }) => {
  return (
    <MainLayout>
      <div>
        <h1>{`Error: ${err.code || 'unknown error'}`}</h1>
        <If condition={!!err.message}>
          <h2>{err.message}</h2>
        </If>
        <DEV json={err} />
      </div>
    </MainLayout>
  );
};

ErrorLayout.propTypes = {
  // err: Object
};

export default ErrorLayout;
