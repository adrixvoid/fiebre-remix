import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect
} from '@remix-run/node';

import {validationError} from '@rvf/remix';
import {ASSET_PATH, ROUTE_PATH_ADMIN} from '~/constants';
import {slugify} from '~/lib/url';
import {productService} from '~/server/services/products.service';
import {Category} from '~/types/category';
import {MapImage} from '~/types/file';
import {Product} from '~/types/product';
import {fileService} from '../lib/file';
import {categoryService} from '../services/category.service';
import {productSchemaValidator} from '../zod/products.zod';

export const PRODUCT_PARAMS = {
  PRODUCT_ID: 'id',
  CATEGORY_ID: 'categoryId'
};

// ----- loaders
export interface LoaderAdminProduct {
  category?: Category;
  categories?: Category[];
  product?: Product;
  referrer: string | null;
}

export async function loaderAdminProductForm({
  request,
  params
}: LoaderFunctionArgs): Promise<LoaderAdminProduct> {
  const url = new URL(request.url);
  const productId = params[PRODUCT_PARAMS.PRODUCT_ID];
  let categoryId = url.searchParams.get(PRODUCT_PARAMS.CATEGORY_ID);
  const referrer = url.searchParams.get('referrer');

  let product: LoaderAdminProduct['product'];

  if (productId) {
    product = await productService.find(productId);
    if (product) categoryId = product?.categoryId?.toString();
  }

  const categories = await categoryService.findMany();
  let category = categories.find((c) => c.id.toString() === categoryId);

  return {category, product, categories, referrer};
}

export async function loaderAdminProductList({params}: LoaderFunctionArgs) {
  const products: Product[] = await productService.findMany();
  return {products};
}

// ----- actions

export async function actionAdminProductForm({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const validation = await productSchemaValidator.validate(formData);

  if (validation.error) return validationError(validation.error);

  let {referrer, imagesToDelete, images, id, ...data} = validation.data;

  let originalProduct;
  let insertImages: MapImage[] = [];

  if (id) {
    originalProduct = await productService.find(id);
    if (originalProduct?.images) insertImages = originalProduct.images;
  }

  if (imagesToDelete && insertImages) {
    insertImages = insertImages.filter(
      (img) => !imagesToDelete.includes(img.filePath)
    );
  }

  if (images) {
    const newImages = await fileService.saveAll(ASSET_PATH.PRODUCTS, images);
    if (newImages) insertImages = insertImages.concat(newImages);
  }

  let file = null;
  if (data.storedFile) {
    file = await fileService.save(ASSET_PATH.PRODUCTS_PRIVATE, data.storedFile);
  }

  const tags = data.tags && typeof data.tags === 'string' ? [data.tags] : [];

  const insertData = Object.assign(data, {
    slug: slugify(data.slug || data.name),
    primaryImage: 0,
    tags,
    stock: data.stock || 0,
    storedFile: file,
    images: insertImages
  });

  if (id) {
    await productService.update(insertData, id);
  } else {
    await productService.create(insertData);
  }

  if (imagesToDelete) fileService.deleteAll(imagesToDelete);

  return redirect(referrer || ROUTE_PATH_ADMIN.PRODUCT_LIST);
}

export async function actionAdminProductDelete({request}: ActionFunctionArgs) {
  let formData = await request.formData();
  let id = String(formData.get('id'));

  if (!id) {
    return json({ok: false}, {status: 404});
  }

  const deleted = await productService.delete(id);

  return json({ok: true, category: deleted});
}
