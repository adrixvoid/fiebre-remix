import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect
} from '@remix-run/node';
import {validationError} from 'remix-validated-form';

import {ASSET_PATH, ROUTE_PATH_ADMIN} from '~/constants';
import categoryModel from '~/server/mongoose/schema/category.schema';
import productModel from '~/server/mongoose/schema/product.schema';
import {Category} from '~/types/category';
import {Product} from '~/types/product';
import {fileService} from '../lib/file';
import {productService} from '../mongoose/products.model';
import {productSchemaValidator} from '../zod/products.zod';

export const PRODUCT_PARAMS = {
  PRODUCT_ID: 'id',
  CATEGORY_ID: 'categoryId'
};

// ----- loaders
export interface LoaderAdminProduct {
  category?: Category;
  categories?: Category[];
  product?: Product | null;
  referrer?: string | null;
}

export async function loaderAdminProduct({
  request,
  params
}: LoaderFunctionArgs): Promise<LoaderAdminProduct> {
  const url = new URL(request.url);
  const productId = params[PRODUCT_PARAMS.PRODUCT_ID];
  let categoryId = url.searchParams.get(PRODUCT_PARAMS.CATEGORY_ID);
  const referrer = url.searchParams.get('referrer');

  let product = null;

  if (Boolean(productId)) {
    product = await productModel.findOne({_id: productId});
    categoryId = product?.categoryId?.toString() || categoryId;
  }

  const categories = await categoryModel.find();

  let category = categories.find((c) => c._id.toString() === categoryId);

  return {category, product, categories, referrer};
}

export async function loaderAdminProductList({params}: LoaderFunctionArgs) {
  const products = await productModel.find();
  return {products};
}

// ----- actions

export async function actionAdminProduct({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const validation = await productSchemaValidator.validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  let {referrer, toDelete, id, ...data} = validation.data;

  let original = null;

  if (id) {
    original = await productModel.findById(id);
  }

  let images = original && Boolean(original?.images) ? original.images : [];
  if (data.images) {
    const newImages = await fileService.saveAll(
      ASSET_PATH.PRODUCTS,
      data.images
    );
    images = images.concat(newImages);
  }
  images = images.filter((img) => !toDelete.includes(img.filePath));

  let file = null;
  if (data.localFile) {
    file = await fileService.save(ASSET_PATH.PRODUCTS_PRIVATE, data.localFile);
  }

  const toSave = Object.assign(data, {images}, {file});

  if (id) {
    await productService.update(toSave, id);
  } else {
    await productService.create(toSave);
  }

  fileService.deleteAll(toDelete as string[]);

  return redirect(referrer || ROUTE_PATH_ADMIN.PRODUCT_LIST);
}

// export async function actionAdminProduct({request}: ActionFunctionArgs) {
//   const formData = await request.formData();
//   const validation = await productSchemaValidator.validate(formData);
// const result = adminProductCreateSchema.safeParse(
//   Object.fromEntries(formData)
// );
// if (!result.success) {
//   return result.error.formErrors.fieldErrors;
// }
// }

export async function actionAdminProductDelete({request}: ActionFunctionArgs) {
  let formData = await request.formData();
  let id = String(formData.get('id'));

  if (!id) {
    return json({ok: false}, {status: 404});
  }

  const deleted = await productModel.findOneAndDelete({
    _id: id
  });

  return json({ok: true, category: deleted});
}
