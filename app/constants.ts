export const SITE_NAME = 'Fiebre';

export const MARKDOWN_TYPES = [
  {value: 'blog', label: 'Blog'},
  {value: 'posts', label: 'Post'},
  {value: 'pages', label: 'Page'},
  {value: 'products', label: 'Products'}
];

export const ASSET_PATH = {
  MARKDOWN: '/markdown',
  CATEGORIES: '/categories',
  PRODUCTS: '/products'
};

export const ROUTE_PATH = {
  HOME: '/',
  ABOUT: '/about',
  BLOG: '/blog',
  CONTACT: '/contact',
  POSTS: '/posts',
  POST: '/post',
  STORE: '/products',
  PRODUCT: '/products',
  NOT_FOUND: '/404'
};

export const ADMIN_ROUTE_PATH = {
  CATEGORY_LIST: '/admin/categories',
  CATEGORY_CREATE: '/admin/categories/add',
  CATEGORY_EDIT: '/admin/categories/edit',
  CATEGORY_DELETE: '/admin/categories/delete',
  PRODUCT: '/admin/products',
  PRODUCT_CREATE: '/admin/content/create'
};

export const CATEGORY_PARAMS = {
  PARENT: 'parent'
};
