import Page from '@lskjs/page';
import HomeLayout from './HomeLayout';
import AuthLayout from './AuthLayout';
import CabinetLayout from './CabinetLayout';
import AdminLayout from './AdminLayout';

Page.HomeLayout = HomeLayout;
Page.AuthLayout = AuthLayout;
Page.CabinetLayout = CabinetLayout;
Page.AdminLayout = AdminLayout;
Page.layouts = {
  auth: AuthLayout,
  home: HomeLayout,
  cabinet: CabinetLayout,
  admin: AdminLayout,
};
