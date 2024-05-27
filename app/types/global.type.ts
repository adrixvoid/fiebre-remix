export type ErrorResponse = {[key: string]: string};

export interface Breadcrumb {
  name: string;
  path: string;
  isActive: boolean;
}

export type MapFile = {
  url: string;
  fileName: string;
  filePath: string;
  directory: string;
};

export interface MapImage extends MapFile {}

export interface Category {
  _id: string;
  id?: string;
  name: string;
  image?: MapImage;
  slug: string;
  path: string;
  parentId?: string;
  subcategories: Category[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type Product = {
  _id: string;
  title: string;
  body?: string;
  slug: string;
  price?: number;
  priceInCents: number;
  stock?: number;
  priceHidden?: boolean;
  preview?: MapImage;
  images?: MapImage[] | [];
  downloadUrl?: string;
  categories?: string[];
  tags?: string[];
  content?: string;
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
