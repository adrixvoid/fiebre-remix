export interface Category {
  _id: string;
  id?: string;
  name: string;
  cover?: Image;
  slug: string;
  path: string;
  parentId?: string;
  subcategories: Category[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Image {
  _id?: string;
  name?: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type Product = {
  _id: string;
  title: string;
  body?: string;
  slug: string;
  price: number;
  stock?: number;
  priceHidden?: boolean;
  preview: Image;
  images: Image[] | [];
  downloadUrl?: string;
  categories?: Category[];
  tags?: string[];
  content?: string;
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
