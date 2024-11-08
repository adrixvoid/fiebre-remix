import {MapFile, MapImage} from './file';

export type Product = {
  _id: string;
  name: string;
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
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  orders?: string[];
  downloadVerification?: string[];
};
