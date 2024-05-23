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

export interface Image extends MapFile {}

export interface Category {
  _id: string;
  id?: string;
  name: string;
  image?: Image;
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
  preview?: Image;
  images?: Image[] | [];
  downloadUrl?: string;
  categories?: Category[];
  tags?: string[];
  content?: string;
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
