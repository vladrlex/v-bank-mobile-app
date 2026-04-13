import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uaTranslations from "./ua.json";
import enTranslations from "./en.json";
import deTranslations from "./de.json";

const resources = {
  en: enTranslations,
  ua: uaTranslations,
  de: deTranslations,
};

export default i18n.use(initReactI18next).init({
  resources,
  lng: "ua",
  fallbackLng: "en",
  ns: ["common", "tabs", "settings", "profile"],
  defaultNS: "common",
  compatibilityJSON: "v4",
  interpolation: {
    escapeValue: false,
  },
});
