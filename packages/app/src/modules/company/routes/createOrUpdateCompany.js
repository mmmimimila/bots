export default ({ uapp, Store, id }) =>
  uapp.catchError(async values => {
    if (!id) {
      const res = await Store.create(values);
      uapp.toast({
        type: 'success',
        title: uapp.i18.t('toasts.company.create'),
      });
      uapp.redirect(`/admin/companies/${res._id}`);
    } else {
      const res = await Store.update({ ...values, _id: id });
      uapp.toast({
        type: 'success',
        title: uapp.i18.t('toasts.company.edit'),
      });
      uapp.redirect(`/admin/companies/${res._id}`);
    }
  });
