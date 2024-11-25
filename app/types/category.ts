import {MapImage} from './file';

export interface Category {
  id: string;
  name: string;
  image?: MapImage | null;
  slug: string;
  path: string;
  parentId: string | null;
  subcategories?: Category[];
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
