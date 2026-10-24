import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/i18n/locales/en.json';
import pt from '@/i18n/locales/pt.json';

i18n.use(initReactI18next).init({
  lng: 'pt',
  fallbackLng: 'pt',
  interpolation: { escapeValue: false },
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
});

export default i18n;
