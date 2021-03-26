import createOrUpdateCompany from './createOrUpdateCompany';
import adminCompanyListAction from './adminCompanyListAction';

export default {
  path: '/companies',
  action({ page, next, i18 }) {
    // i18.loadNamespaces('adminCompanies');
    return page
      .meta({
        title: i18.t('pages.adminCompanies.title'),
        url: '/admin/companies',
      })
      .next(next);
  },
  children: [
    {
      path: '',
      action: adminCompanyListAction,
    },
    {
      path: '/users',
      action: adminCompanyListAction,
      // action: adminCompanyUserAction,
    },
    {
      path: '/create',
      async action({ uapp, page, i18 }) {
        const { CompanyStore } = uapp.stores;
        const onSubmit = createOrUpdateCompany({ uapp, Store: CompanyStore });
        return page
          .meta({
            title: i18.t('pages.adminCompaniesCreate.title'),
            url: '/admin/companies/create',
          })
          .component(import('../pages/AdminCompanyEditPage'), { type: 'create', onSubmit });
      },
    },
    {
      path: '/:id',
      async action({ uapp, page, i18 }, { id }) {
        const { CompanyStore, ListStore, CompanyUserStore } = uapp.stores;
        const item = await CompanyStore.findOne(id);
        if (!item) throw '!item';
        const companyUserListStore = {};
        // const companyUserListStore = new ListStore({
        //   api: CompanyUserStore,
        //   getFindParams: store => ({
        //     filter: {
        //       ...store.filter,
        //       companyId: id,
        //     },
        //     sort: store.sort,
        //     select: ['userId', 'user', 'position'],
        //   }),
        //   sort: { createdAt: -1 },
        // });
        // if (__CLIENT__) await companyUserListStore.fetch();
        return page
          .meta({
            title: i18.t('pages.adminCompaniesView.title', item),
            url: `/admin/companies/${id}`,
          })
          .component(import('../pages/AdminCompanyViewPage'), { item, companyUserListStore });
      },
    },
    {
      path: '/:id/edit',
      async action({ uapp, page, i18 }, { id }) {
        const { CompanyStore } = uapp.stores;
        const item = await CompanyStore.findOne(id);
        if (!item) throw '!item';
        const onSubmit = createOrUpdateCompany({ uapp, Store: CompanyStore, id });
        const onRemove = uapp.catchError(async () => {
          await item.constructor.api.remove(item._id);
          uapp.toast(i18.t('company.companyDeletedSuccessful'));
          uapp.redirect('/admin/companies');
        });
        return page
          .meta({
            title: i18.t('pages.adminCompaniesView.title', item),
            url: `/admin/companies/${id}`,
          })
          .meta({
            title: i18.t('pages.adminCompaniesEdit.title', item),
            url: `/admin/companies/${id}/edit`,
          })
          .component(import('../pages/AdminCompanyEditPage'), { item, type: 'edit', onSubmit, onRemove, uapp });
      },
    },
  ],
};
