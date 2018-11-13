import i18next from 'i18next';
import resources from './resource/locales/translation.json';

const i18n = i18next
  .init({
    resources,
    // resources: {
    //   en: {
    //     "translation": {
    //       "hoge": "Hoge"
    //     }
    //   },
    //   ja: {
    //     "hoge": "ほげ"
    //   }
    // },
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // not needed for react
      formatSeparator: ',',
    },

    // react-i18next special options (optional)
    react: {
      wait: true,  // true: wait for loaded in every translated hoc
    }
  });

export default i18n;