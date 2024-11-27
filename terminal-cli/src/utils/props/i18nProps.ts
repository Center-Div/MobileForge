export const i18nPackages = [
  "i18next",
  "react-i18next",
  "expo-localization",
  "@types/react-i18next",
].join(" ");

export const i18nFile = `import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './locales/en.json';
import fr from './locales/fr.json';

function getCurrentLanguage(): string {
  const locales = Localization.getLocales();
  const preferredLocale = locales[0]?.languageTag;

  return preferredLocale ?? 'en';
}


const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getCurrentLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
`;

export const enTranslation = `{
  "welcome": "Welcome",
  "description": "This is an example app."
}`;
export const frTranslation = `{
  "welcome": "Bienvenue",
  "description": "Ceci est une application exemple."
}`;
