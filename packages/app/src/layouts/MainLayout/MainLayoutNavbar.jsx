import React from 'react';
import { inject, observer } from '@lskjs/uapp/mobx-react';
import { Navbar, Nav, NavDropdown } from '@lskjs/navbar';
import GlobalStyles from '@lskjs/navbar/GlobalStyles';
import Link from '@lskjs/link';
import T from '@lskjs/t';
import ChipItem from '@lskjs/ui/ChipItem';

const MainLayoutNavbar = ({ auth, config }) => (
  <Navbar bg="light" expand="lg">
    <GlobalStyles />
    {config && config.about && config.about.title && <Navbar.Brand href="/">{config.about.title}</Navbar.Brand>}
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      {auth && auth.session ? (
        <>
          <Nav className="mr-auto" activeKey="/admin">
            {/* <Nav.Link as={Link} href="/cabinet">
              <T name="pages.cabinet.title" />
            </Nav.Link> */}
            <Nav.Link as={Link} href="/admin">
              <T name="pages.admin.title" />
            </Nav.Link>
          </Nav>
          <NavDropdown title={<ChipItem size={24} item={auth.session.user} />} id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} href="/auth/logout">
              <T name="pages.authLogout.title" />
            </NavDropdown.Item>
          </NavDropdown>
        </>
      ) : (
        <>
          <Nav.Link as={Link} href="/auth/login">
            <T name="pages.authLogin.title" />
          </Nav.Link>
        </>
      )}
    </Navbar.Collapse>
  </Navbar>
);

export default inject('auth', 'config')(observer(MainLayoutNavbar));
