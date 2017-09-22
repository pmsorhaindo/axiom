import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { useRouterHistory, match, RouterContext, Router } from 'react-router';
import { createMemoryHistory, createHistory } from 'history';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import routes from './routes';
import template from './index.ejs';
import './client.css';

if (typeof document !== 'undefined') {
  const browserHistory = useRouterHistory(createHistory)({
    basename: __BASENAME__,
  });

  render((
    <I18nextProvider i18n={ i18n }>
      <Router history={ browserHistory } routes={ routes } />
    </I18nextProvider>
  ), document.getElementById('react-root'));
}

export default (locals, callback) => {
  const history = createMemoryHistory({ basename: __BASENAME__ });
  const location = history.createLocation(locals.path);
  const hash = locals.webpackStats.hash;

  function matchLocation(location) {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        return matchLocation(redirectLocation);
      }

      callback(null, template({
        htmlWebpackPlugin: {
          options: {
            basename: __BASENAME__,
            stylesheet: `assets/bundle.${hash}.min.css`,
            script: `assets/bundle.${hash}.min.js`,
            html: renderToString(<RouterContext { ...renderProps } />),
          },
        },
      }));
    });
  }

  matchLocation(location);
};
