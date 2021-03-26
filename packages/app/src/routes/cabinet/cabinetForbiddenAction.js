export default async ({ page, app, query, config }) =>
  page
    .meta({
      title: 'pages.cabinetForbidden.title',
      url: '/cabinet/forbidden',
      status: 403,
    })
    .component(app.module('pages.ForbiddenPage'), { r: query.r, about: config.about });
