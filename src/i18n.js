import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';
import translationUR from './locales/ur/translation_v2.json';
import translationFR from './locales/fr/translation.json';

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
  ur: { translation: translationUR },
  fr: { translation: translationFR }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en', // Explicitly setting 'en' as default, as requested.
    interpolation: {
      escapeValue: false, // react already safes from xss
    }
  });

export default i18n;
