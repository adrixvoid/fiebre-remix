// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
import type {iconPaths} from '~/components/ui/icon/IconPaths';

export const SITE_TITLE = 'F I E B R E ®';
export const SITE_DESCRIPTION = 'Fiebre Design Studio - Buenos Aires Argentina';

export const MARKDOWN_TYPE = {
  blog: 'Blog',
  portfolio: 'Portfolio',
  page: 'Page'
};

export const ASSET_PATH = {
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
  SHOP: '/shop',
  SHOP_DETAIL: '/shop/detail',
  SHOPPING_CART: '/shop/cart',
  SHOPPING_PAYMENT: '/shop/payment',
  NOT_FOUND: '/404'
};

export const ROUTE_PATH_ADMIN = {
  CATEGORY_LIST: '/admin/categories',
  CATEGORY_CREATE: '/admin/categories/create',
  CATEGORY_EDIT: '/admin/categories/edit',
  CATEGORY_DELETE: '/admin/categories/delete',
  PRODUCT_LIST: '/admin/products',
  PRODUCT_FORM: '/admin/products/form',
  CONTENT_CREATE: '/admin/content/form'
};

/** Main menu items */
export const navigationLinks: {label: string; href: string}[] = [
  {label: 'Servicios', href: '/#services'},
  {label: 'Sobre mi', href: '/#about'},
  {label: 'Recursos', href: '/#resources'},
  {label: 'Portfolio', href: '/portfolio'}
];

/** Icon links to social media — edit these with links to your profiles! */
export const socialLinks: {
  label?: string;
  href: string;
  icon: keyof typeof iconPaths;
  title?: string;
  rel?: string;
}[] = [
  {
    // label: "fiebredg@hotmail.com",
    href: 'mailto:fiebredg@hotmail.com',
    icon: 'paper-plane-tilt',
    title: 'Contact me fiebredg@hotmail.com',
    rel: 'noopener noreferrer'
  },
  {
    title: 'Linkedin',
    href: 'https://www.linkedin.com/in/desi-fiebre-creativa/',
    icon: 'linkedin-logo',
    rel: 'noopener noreferrer'
  },
  {
    title: 'Pinterest',
    href: 'https://ar.pinterest.com/fiebrecreativa/',
    icon: 'pinterest-logo',
    rel: 'noopener noreferrer'
  },
  {
    title: 'My Instagram',
    href: 'https://www.instagram.com/fiebre.creativa/',
    icon: 'instagram-logo',
    rel: 'noopener noreferrer'
  },
  {
    title: 'My Behance portfolio',
    href: 'https://www.behance.net/fiebre_creativa',
    rel: 'noopener noreferrer',
    icon: 'behance-logo'
  }
];

export const PORTFOLIO_FILTERS = [
  {
    label: 'Ilustraciones',
    category: 'illustration'
  },
  {
    label: 'Branding',
    category: 'branding'
  },
  {
    label: 'Todo',
    category: 'all',
    active: true
  }
];
