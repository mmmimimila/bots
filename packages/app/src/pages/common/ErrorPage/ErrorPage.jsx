import Page from '@lskjs/page';
import React, { Component } from 'react';

import ErrorInfo from '../components/ErrorInfo';

class ErrorPage extends Component {
  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError', error);
    return { hasError: true, error };
  }

  state = {
    hasError: false,
    error: null,
  };

  // componentDidCatch(error, errorInfo) {
  //   console.log({ errorInfo });
  //   this.setState({ error, errorInfo });
  // }

  render() {
    const { hasError, error } = this.state;
    const { children, layout, ...props } = this.props;
    let { err } = this.props;

    console.log(err, hasError, { error });
    if (err || (hasError && error)) {
      console.log({ error });
      if (!err) {
        err = {
          code: 'react',
          message: error.toString(),
          stack: error.stack,
        };
      }
      return (
        <Page layout={layout} {...props}>
          <Page.Header />
          <ErrorInfo err={err} />
        </Page>
      );
    }
    return children;
  }
}

export default ErrorPage;
