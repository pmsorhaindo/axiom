import React from 'react';
import { render } from 'react-dom';
import { useRouterHistory, Router } from 'react-router';
import { createHistory } from 'history';
import { I18nextProvider } from 'react-i18next';
import Translator from './components/Translator/Translator';
import i18n from './i18n';
import routes from './routes';
import './client.css';

const browserHistory = useRouterHistory(createHistory)({
  basename: __BASENAME__,
});

render((
  <I18nextProvider i18n={ i18n }>
    <Translator>
      <Router history={ browserHistory } routes={ routes } />
    </Translator>
  </I18nextProvider>
), document.getElementById('react-root'));
