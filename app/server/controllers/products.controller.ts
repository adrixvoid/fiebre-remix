import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect
} from '@remix-run/node';
import {z} from 'zod';
import {withZod} from '@remix-validated-form/with-zod';
import {validationError} from 'remix-validated-form';

import productModel from '~/server/schema/product.schema';
import categoryModel from '~/server/schema/category.schema';
import {fileService} from '../services/file.service';
import {ADMIN_ROUTE_PATH, ASSET_PATH} from '~/constants';
import {productService} from '../services/products.service';
import {Product} from '~/types/global.type';

export const PRODUCT_PARAMS = {
  CATEGORY_ID: 'categoryId'
};

// ----- loaders

export async function loaderAdminProductCreate({
  request,
  params
}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const categoryId = url.searchParams.get(PRODUCT_PARAMS.CATEGORY_ID);

  let category = null;
  if (Boolean(categoryId)) {
    category = await categoryModel.findOne({_id: categoryId});
  }
  // const referrer = request.headers.get('referer') || '';
  // const list = await productModel.find({
  //   parentId: null
  // });

  return {category};
}

export async function loaderAdminProductList({params}: LoaderFunctionArgs) {
  const list = await productModel.find();
  return {list};
}

// ----- actions

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const zImageSchema = z
  .any()
  // .refine((files) => files?.[0]?.size > 0, 'Image required')
  .refine(
    (files) =>
      files?.[0]?.size > 0 ? files?.[0]?.size <= MAX_FILE_SIZE : true,
    `Max image size is 5MB.`
  )
  .refine(
    (files) =>
      files?.[0]?.size > 0 ? files?.[0]?.type.startsWith('image/') : true,
    'Only .jpg, .jpeg, .png and .webp formats are supported.'
  );

export const adminProductCreateSchema = z
  .object({
    title: z.string().min(1),
    description: z.string(),
    priceHidden: z.coerce.boolean(),
    priceInCents: z.coerce.number().int().default(0),
    productType: z.union([
      z.literal('physical'),
      z.literal('link'),
      z.literal('file')
    ]),
    stock: z.coerce.number().int().optional(),
    downloadUrl: z.string().url().optional(),
    file: z.instanceof(File).optional(),
    images: zImageSchema.optional(),
    tags: z.string().optional(),
    slug: z.string().optional(),
    draft: z.string().transform((value) => value === 'draft'),
    categoryId: z.string().optional(),
    referrer: z.string().optional()
  })
  .refine(
    (data) =>
      !data.priceHidden && data.priceInCents ? data.priceInCents > 0 : true,
    {
      message: 'Price must be greater than 0 when priceHidden is false',
      path: ['price']
    }
  )
  .refine(
    (data) =>
      data.productType === 'physical' && data.stock ? data.stock >= 0 : true,
    {
      message: 'Stock have at least 1 product',
      path: ['stock', 'productType']
    }
  )
  .refine(
    (data) => (data.productType === 'link' ? data.downloadUrl !== '' : true),
    {
      message: 'Should have a valid URL',
      path: ['downloadUrl', 'productType']
    }
  )
  .refine(
    (data) => (data.productType === 'file' ? Boolean(data?.file?.size) : true),
    {
      message: 'File Required',
      path: ['file', 'productType']
    }
  );

export const adminProductCreateValidator = withZod(adminProductCreateSchema);

export async function actionAdminProductCreate({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const validation = await adminProductCreateValidator.validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  let {referrer, categoryId, ...data} = validation.data;

  let images = null;
  if (data.images) {
    images = await fileService.saveAll(ASSET_PATH.PRODUCTS, data.images);
  }

  let file = null;
  if (data.file) {
    file = await fileService.save(ASSET_PATH.PRODUCTS_PRIVATE, data.file);
  }

  let categories: Product['categories'] = [];
  if (categoryId) {
    categories = [categoryId];
  }

  const toSave = Object.assign(data, {categories}, {images}, {file});

  await productService.create(toSave);

  return redirect(String(referrer) || ADMIN_ROUTE_PATH.CATEGORY_LIST);
}

// export async function actionAdminProductCreate({request}: ActionFunctionArgs) {
//   const formData = await request.formData();
//   const validation = await adminProductCreateValidator.validate(formData);
// const result = adminProductCreateSchema.safeParse(
//   Object.fromEntries(formData)
// );
// if (!result.success) {
//   return result.error.formErrors.fieldErrors;
// }
// }
