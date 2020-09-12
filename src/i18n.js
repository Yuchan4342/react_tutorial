import i18next from 'i18next';
import resources from './resource/locales/translation.json';
import { initReactI18next } from 'react-i18next';

const i18n = i18next
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      formatSeparator: ',',
    },

    // react-i18next special options (optional)
    // override if needed - omit if ok with defaults
    react: {
      wait: true,  // true: wait for loaded in every translated hoc
      useSuspense: true,
    }
  });

export default i18n;
