import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import fr from './locales/fr.json';
import en from './locales/en.json';
import ar from './locales/ar.json';

export const supportedLanguages = [
  { code: 'fr', label: 'FR', dir: 'ltr' },
  { code: 'en', label: 'EN', dir: 'ltr' },
  { code: 'ar', label: 'AR', dir: 'rtl' },
] as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
  });

// Met à jour dir="rtl"/"ltr" sur <html> à chaque changement de langue
i18n.on('languageChanged', (lng) => {
  const lang = supportedLanguages.find((l) => l.code === lng);
  document.documentElement.dir = lang?.dir ?? 'ltr';
  document.documentElement.lang = lng;
});

export default i18n;
