import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import translationEN from "./locales/en/translation.json";
import translationPT from "./locales/pt/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    pt: { translation: translationPT },
  },
  lng: "pt", // Set default language to Portuguese
  fallbackLng: "pt", // Fallback to Portuguese if key is missing
  interpolation: {
    escapeValue: false, // React already escapes values to prevent XSS
  },
});

export default i18n;
