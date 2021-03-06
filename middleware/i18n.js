export default function ({isHMR, app, store, route, params, error, redirect}) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return;

  if (!params.lang && !(new RegExp(app.i18nRegEx).test(route.fullPath))) {
    return redirect("/en" + route.fullPath);
  }

  // Get locale from params
  const locale = params.lang || 'en';

  if (store.state.locales.indexOf(locale) === -1) {
    return error({message: 'This page could not be found.', statusCode: 404})
  }

  // Set locale
  store.commit('SET_LANG', locale);
  app.i18n.locale = store.state.locale;
}
