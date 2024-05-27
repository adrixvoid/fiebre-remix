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
      LIST: 'List',
      ADD: 'Add',
      EMPTY: "There isn't any category associated",
      NEW: 'New Category',
      CATEGORIES: 'Categories',
      SUBCATEGORY: 'Subcategory'
    },
    PRODUCT: {
      PRODUCT: 'Product',
      PRODUCTS: 'Products',
      NEW: 'New Product'
    },
    DATA: {
      EMPTY: 'Empty'
    },
    TABLE: {
      IMAGE: 'Image',
      ACTIONS: 'Actions'
    }
  },
  'es-AR': {
    ADD_TO_CART: 'Agregar al carrito',
    INQUIRE: 'Consultar',
    CATEGORY: {
      LIST: 'Lista',
      ADD: 'Agregar',
      EMPTY: 'No hay subcategorías agregadas',
      NEW: 'Nueva Categoría',
      CATEGORIES: 'Categorías',
      SUBCATEGORY: 'Subcategoría',
      TABLE: {
        ACTIONS: 'Acciones'
      }
    },
    PRODUCT: {
      PRODUCT: 'Producto',
      PRODUCTS: 'Productos',
      NEW: 'Nuevo Producto'
    },
    DATA: {
      EMPTY: 'Vacío'
    },
    TABLE: {
      IMAGE: 'Imagen',
      ACTIONS: 'Acciones'
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
