import get from 'lodash/get';

export default async ({ uapp, page, query, i18 }) => {
  const { ListStore, CompanyStore } = uapp.stores;
  const listStore = new ListStore({
    api: CompanyStore,
    getFindParams: (store, params) => ({
      ...params,
      view: 'medium',
    }),
    sort: { createdAt: -1 },
  });
  if (__CLIENT__) {
    page.onExit(ListStore.connect({ page, listStore, query }));
    listStore.fetch();
  }
  const props = {};
  const handleRemove = uapp.catchError(async item => {
    await item.constructor.api.remove(get(item, '_id'));
    listStore.fetch();
  });

  const handleApprove = item => {
    item.constructor.api.approve({ _id: get(item, '_id') }).then(() => {
      uapp.toast(i18.t('toasts.approveSuccess'));
      uapp.refresh();
    });
  };
  return page
    // .meta({
    //   title: i18.t('pages.adminCompanies.title'),
    //   url: '/admin/companies',
    // })
    .component(import('../pages/AdminCompanyListPage'), {
      listStore,
      ...props,
      itemProps: {
        handleRemove,
        handleApprove,
      },
    });
};
