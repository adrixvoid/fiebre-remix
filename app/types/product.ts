import {MapFile, MapImage} from './file';

// export type ProductType = 's
export enum PRODUCT_TYPE {
  stock = 'stock',
  externalUrl = 'externalUrl',
  storedFile = 'storedFile'
}

export type Product = {
  id: string;
  name: string;
  description: string | null;
  priceHidden: boolean;
  priceInCents: number;
  images: MapImage[];
  primaryImage: number;
  tags?: string[];
  published: boolean;
  slug: string;

  productType: keyof typeof PRODUCT_TYPE;
  stock?: number;
  externalUrl?: string | null;
  storedFile?: MapFile | null;

  categoryId: string;
  downloadVerification?: string[];

  createdAt?: Date;
  updatedAt?: Date;
};
