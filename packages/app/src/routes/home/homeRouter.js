export default {
  path: '',
  children: [
    {
      path: '/(index)?',
      async action({ page, app, req }) {
        const { about = {} } = app.config;
        const HomeIndexPage = await app.module('pages.HomeIndexPage').catch(err => {
          console.log('HOME', {err})
        });
        console.log({ HomeIndexPage });
        return page.component(HomeIndexPage, { about, req });
      },
    },
  ],
};
