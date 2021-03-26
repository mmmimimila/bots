import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Header, TopBar, SubBar, Body } from './Layout.styles';

class Layout extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };
  static Wrapper = Wrapper;
  static Header = Header;
  static TopBar = TopBar;
  static SubBar = SubBar;
  static Body = Body;
  render() {
    const { children } = this.props;
    return children;
  }
}

export default Layout;
