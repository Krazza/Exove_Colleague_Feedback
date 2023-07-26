import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const Languages = ['en', 'fi'];

i18n
  .use(Backend) // load translation using xhr -> see /public/locales. We will add locales in the next step
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next
  .init({
    debug: true,
    whitelist: Languages,
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        translation: require('src/locales/en/translation.json'),
      },
      fi: {
        translation: require('src/locales/fi/translation.json'),
      },
    },
  });

export default i18n;