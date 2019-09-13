import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import common_de from "./locales/de/translation.json";
import common_en from "./locales/en/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: common_en
    },
    de: {
      translation: common_de
    }
  },
  lng: "en",
  fallbackLng: "en",
  debug: true,

  keySeparator: false,

  interpolation: {
    escapeValue: false
  }
});

export default i18n;
