interface TranslationItem {
  [key: string]: string | TranslationItem;
}

type Translations = {
  [key: string]: TranslationItem;
};

export const translations: Translations = {
  'en-US': {
    ADD_TO_CART: 'Add to cart',
    INQUIRE: 'Inquire',
    CATEGORY: {
      ADD: 'Add',
      EMPTY: "There isn't any category associated",
      NEW: 'New Category',
      TABLE: {
        ACTIONS: 'Actions'
      }
    },
    PRODUCT: {
      NEW: 'New Product'
    }
  },
  'es-AR': {
    ADD_TO_CART: 'Agregar al carrito',
    INQUIRE: 'Consultar',
    CATEGORY: {
      ADD: 'Agregar',
      EMPTY: 'No hay subcategorías agregadas',
      NEW: 'Nueva Categoría',
      TABLE: {
        ACTIONS: 'Acciones'
      }
    },
    PRODUCT: {
      NEW: 'Nuevo Producto'
    }
  }
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
