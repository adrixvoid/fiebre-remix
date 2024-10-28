import enUS from './translations/en-US';
import esAR from './translations/es-AR';

interface TranslationItem {
  [key: string]: string | TranslationItem;
}

type Translations = {
  [key: string]: TranslationItem;
};

export const translations: Translations = {
  'en-US': enUS,
  'es-AR': esAR
};

export function t(key: string): string {
  const lang = 'es-AR';
  const keys = key.split('.');
  let translation: TranslationItem | string | undefined = translations[lang];
  for (const k of keys) {
    if (
      typeof translation === 'object' &&
      translation !== null &&
      translation.hasOwnProperty(k)
    ) {
      translation = (translation as TranslationItem)[k];
    } else {
      return key;
    }
  }
  return typeof translation === 'string' ? translation : key;
}
