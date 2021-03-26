import React from 'react';
// import { DEV } from '@lskjs/ui2/DEV';

export const ErrorInfo = ({ err }) => (
  <>
    <h1>{`Error: ${err.code || 'unknown error'}`}</h1>

    {err.message && <h2>{err.message}</h2>}
    {/* {err.stack && typeof err.stack === 'string' ? (
      <DEV>
        <pre>{err.stack}</pre>
      </DEV>
    ) : (
      <DEV json={err} />
    )} */}
  </>
);

export default ErrorInfo;
