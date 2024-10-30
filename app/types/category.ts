import {MapImage} from './file';

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
