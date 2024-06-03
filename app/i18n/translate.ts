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
      EMPTY: "There isn't any category associated",
      CATEGORIES: 'Categories',
      SUBCATEGORY: 'Subcategory'
    },
    PRODUCT: {
      NEW: 'New Product',
      PRODUCT: 'Product',
      PRODUCTS: 'Products'
    },
    DATA: {
      EMPTY: 'Empty'
    },
    GLOBAL: {
      ACTIONS: 'Actions',
      CREATE: 'Create',
      DELETE: 'Delete',
      EDIT: 'Edit',
      EMPTY: 'Empty',
      IMAGE: 'Image',
      NEW: 'New'
    }
  },
  'es-AR': {
    ADD_TO_CART: 'Agregar al carrito',
    INQUIRE: 'Consultar',
    CATEGORY: {
      LIST: 'Lista',
      EMPTY: 'No hay subcategorías agregadas',
      NEW: 'Nueva Categoría',
      CATEGORIES: 'Categorías',
      SUBCATEGORY: 'Subcategoría'
    },
    PRODUCT: {
      NEW: 'Nuevo Producto',
      PRODUCT: 'Producto',
      PRODUCTS: 'Productos'
    },
    GLOBAL: {
      ACTIONS: 'Acciones',
      CREATE: 'Crear',
      DELETE: 'Eliminar',
      EDIT: 'Editar',
      EMPTY: 'Vacío',
      IMAGE: 'Imagen',
      NEW: 'Nuevo'
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
