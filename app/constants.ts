export const SITE_NAME = 'Fiebre';

// @see frontmatter.json config file
export const FRONT_MATTER_FOLDER = 'content';

export const MARKDOWN_TYPE = {
  blog: 'Blog',
  portfolio: 'Portfolio',
  page: 'Page'
};

export const ASSET_PATH = {
  CONTENT: 'public/content',
  CATEGORIES: 'public/categories',
  PRODUCTS: 'public/products',
  PRODUCTS_PRIVATE: 'private/products'
};

export const ROUTE_PATH = {
  HOME: '/',
  ABOUT: '/about',
  BLOG: '/blog',
  CONTACT: '/contact',
  PORTFOLIO: '/portfolio',
  STORE: '/products',
  PRODUCT: '/products',
  NOT_FOUND: '/404'
};

export const ADMIN_ROUTE_PATH = {
  CATEGORY_LIST: '/admin/categories',
  CATEGORY_CREATE: '/admin/categories/create',
  CATEGORY_EDIT: '/admin/categories/edit',
  CATEGORY_DELETE: '/admin/categories/delete',
  PRODUCT_LIST: '/admin/products',
  PRODUCT_FORM: '/admin/products/form',
  CONTENT_CREATE: '/admin/content/create'
};
