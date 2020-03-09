import i18n from "i18next"
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import en from "./en"
import ja from "./ja"

const resources = { en, ja }

i18n
  .use(i18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ja",
    debug: process.env.NODE_ENV === "development",
    interpolation: { escapeValue: false },
  })

export default i18n
