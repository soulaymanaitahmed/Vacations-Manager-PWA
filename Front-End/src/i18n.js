import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookies from 'js-cookie';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
  
  .use(Backend)
  
  .use(LanguageDetector)
  
  .use(initReactI18next)
 
  .init({
    lng: Cookies.get('i18next') || 'fr',
    fallbackLng: 'fr',
    supportedLngs: ['ar', 'fr'], 
    load: 'languageOnly',
    debug: true,

    interpolation: {
      escapeValue: false,
    }
  });


export default i18n;