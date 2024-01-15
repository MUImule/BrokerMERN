// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      // translation: {
      // //  welcome: 'Welcome!',
      //   jobTitle: 'Job Title',
      //   jobDescription: 'Job Description',
      //   location: 'Location',
      //   // Add other translations
      // },
    },
    am: {
      // translation: {
      //   //welcome: 'እንኳን ደህና መጣህ!',
      //   jobTitle: 'ስለዚህ ስለሚጠቀሙ ስለሚለዋወጥ ምንዛሬ',
      //   jobDescription: 'ምሳሌ ለማስጠቀም',
      //   location: 'ቦታ',
      //   // Add other translations
      // },
    },
  },
  lng: 'en', // default language
  fallbackLng: 'en', // fallback language
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
