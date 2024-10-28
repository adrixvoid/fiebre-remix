export type ErrorResponse = {[key: string]: string};

export interface Breadcrumb {
  name: string;
  path: string;
  isActive?: boolean;
}

export type MapFile = {
  url: string;
  fileName: string;
  filePath: string;
  directory: string;
};

export interface MapImage extends MapFile {}

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  orders: string[];
};

export interface Category {
  _id: string;
  id?: string;
  name: string;
  image?: MapImage;
  slug: string;
  path: string;
  parentId?: string;
  subcategories: Category[];
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type Product = {
  _id: string;
  title: string;
  description?: string;
  slug: string;
  preview?: MapImage;
  images: MapImage[];
  price?: number;
  priceInCents: number;
  priceHidden?: boolean;
  productType: 'stock' | 'downloadUrl' | 'file';
  stock?: number;
  downloadUrl?: string;
  file?: MapFile;
  categories?: string[];
  tags?: string[];
  isAvailableForPurchase: boolean;
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  orders: string[];
  downloadVerification: string[];
};

export type Order = {
  id: string;
  pricePaidInCents: number;
  userId?: string;
  productId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DownloadVerification = {
  id: string;
  downloadTimes: number;
  product: string;
  productId: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
