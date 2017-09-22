import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
// import Cache from 'i18next-localstorage-cache';
// import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(XHR)
  //.use(Cache)
  //.use(LanguageDetector)
  .init({
    lng: 'de',
    fallbackLng: 'en',
    react: {
      wait: true,
    },
    ns: ['common'],
    defaultNS: 'common',
    debug: true,
    //cache: {
    //  enabled: true
    //},
  });

export default i18n;
