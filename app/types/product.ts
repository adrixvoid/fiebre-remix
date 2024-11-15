import {MapFile, MapImage} from './file';

// export type ProductType = 's
export enum ProductType {
  stock = 'stock',
  externalUrl = 'externalUrl',
  file = 'file'
}

export type Product = {
  id: string;
  name: string;
  description?: string;
  priceHidden?: boolean;
  priceInCents: number;
  images: MapImage[];
  primaryImage: number;
  tags?: string[];
  published: boolean;
  slug: string;

  productType: keyof typeof ProductType;
  stock: number;
  externalUrl?: string;
  storedFile?: MapFile;

  categoryId: string;
  downloadVerification?: string[];
  orders?: string[];

  createdAt?: Date;
  updatedAt?: Date;
};
