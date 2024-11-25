import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect
} from '@remix-run/node';

import {ASSET_PATH, ROUTE_PATH_ADMIN} from '~/constants';
import {getBreadcrumb} from '~/lib/breadcrumb';
import {slugify} from '~/lib/url';

import {type Breadcrumb} from '~/types/breadcrumb';
import {Category} from '~/types/category';
import {type MapFile} from '~/types/file';
import type {Product} from '~/types/product';

import {validationError} from '@rvf/remix';
import {fileService} from '~/server/lib/file';
import {categoryService} from '~/server/services/category.service';
import {productService} from '../services/products.service';
import {categoryValidator} from '../zod/category.zod';

export interface CategoryFormFields {
  name?: string;
  parentId?: string;
  slug?: string;
  path?: string;
  image?: string;
}

export interface ValidationErrorForm {
  message: string | undefined;
  fields: {[k: string]: string};
}

export interface AdminCategoryActionForm {
  error: ValidationErrorForm;
}

export interface AdminCategoryLoaderList {
  category: Category | null;
  categories: Category[];
  breadcrumb?: Breadcrumb[];
  products: Product[];
}

export const CATEGORY_PARAMS = {
  CATEGORY_ID: 'id',
  PARENT: 'parent'
};

export async function loaderAdminCategoriesList({
  params
}: LoaderFunctionArgs): Promise<AdminCategoryLoaderList> {
  const path = params['*'] as string;

  const category = await categoryService.findByPath(path);
  const categories = category?.subcategories
    ? category?.subcategories
    : await categoryService.findManyByPath(path);

  // if (!category) {
  //   throw new Error(`Category ${path} not found`);
  // }

  // const products = await productService.findByCategory(category.id);
  // const breadcrumb = getBreadcrumb<Category>(path, categories);
  // return {categories: category.subcategories, category, breadcrumb, products};

  const breadcrumb = getBreadcrumb<Category>(path, categories);
  let products = await productService.findByCategory('');

  // const products: Product[] = await productModel.find({
  //   categories: []
  // });

  // const products = await productModel.find({$where:'this.categories.length>0'});

  // return {categories, category: undefined, breadcrumb: [], products: []};
  // return {categories, breadcrumb: [], category: undefined, products};
  return {categories, category, breadcrumb, products};
}

// export async function getMongooseSubcategory(
//   path: string
// ): Promise<AdminCategoryLoaderList> {
//   const categories = (await categoryModel
//     .find()
//     .populate('subcategories')
//     .exec()) as Category[];

//   const category = categories.find(
//     (d: Category) => d.path === sanitizeUrl(path)
//   );

//   const products: Product[] = await productModel.find({
//     categories: {$in: [category?.id]}
//   });
//   // .where('likes').in(['vaporizing', 'talking']);

//   const breadcrumb = getBreadcrumb<Category>(category?.path || '', categories);

//   const subcategories = category?.subcategories || [];

//   return {category, categories: subcategories, breadcrumb, products};
// }

export interface LoaderAdminCategory {
  category?: Category;
  categories?: Category[];
  product?: Product | null;
  referrer?: string | null;
}

export async function loaderAdminCategoriesForm({
  request,
  params
}: LoaderFunctionArgs): Promise<LoaderAdminCategory> {
  const categoryId = params[CATEGORY_PARAMS.CATEGORY_ID];
  const url = new URL(request.url);
  const referrer = url.searchParams.get('referrer');

  const categories = await categoryService.findMany();

  let category;
  if (Boolean(categoryId)) {
    category = categories.find((c) => c.id.toString() === categoryId);
  }

  return {category, categories, referrer};
}

export async function actionAdminCategoriesList({request}: ActionFunctionArgs) {
  let formData = await request.formData();
  let entries = Object.fromEntries(formData);
  // const docs = await shoppingCartAction(request);
  return json({ok: true});
}

export async function actionAdminCategoriesDelete({
  request
}: ActionFunctionArgs) {
  try {
    let formData = await request.formData();
    let id = String(formData.get('id'));

    if (!id) {
      throw new Error('The id is required');
    }

    const deletedCategory = await categoryService.delete(id);

    return json({ok: true, category: deletedCategory});
  } catch (error) {
    return json(error.message, {status: 404});
  }
}

export async function actionAdminCategoriesForm({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const validation = await categoryValidator.validate(formData);

  if (validation.error) return validationError(validation.error);

  let {referrer, imageToDelete, id, image, ...data} = validation.data;

  const insertData: Omit<Category, 'id' | 'path'> = {
    ...data,
    slug: slugify(data.name)
  };

  if (image) {
    insertData.image = await fileService.save(ASSET_PATH.CATEGORIES, image);
  }

  if (id) {
    await categoryService.update(insertData, id);
  } else {
    await categoryService.create(insertData);
  }

  if (imageToDelete) fileService.delete(imageToDelete);

  return redirect(referrer || ROUTE_PATH_ADMIN.CATEGORY_LIST);
}

// this still unused. Waiting for refactor
export async function actionAdminCategoriesUpdate({
  request
}: ActionFunctionArgs) {
  // const clonedRequest = request.clone();
  const formData = await request.formData();
  const fromEntries = Object.fromEntries(formData);

  const error: ValidationErrorForm = {
    message: undefined,
    fields: {}
  };

  try {
    // a partir de aca se sigue
    const isNewItem = (fromEntries._action as string).includes(
      ROUTE_PATH_ADMIN.CATEGORY_CREATE
    );

    const insertData = {
      id: undefined,
      name: String(formData.get('name')),
      parentId: String(formData.get('parentId')),
      image: <MapFile | undefined>undefined,
      active: Boolean(formData.get('active')),
      slug: slugify(String(formData.get('name')))
    };

    if (insertData.name.length === 0) {
      error.fields.name = 'required';
    }

    if (Object.keys(error.fields).length > 0) {
      return json({error});
    }

    // uploadImages
    insertData.image = await fileService.save(
      ASSET_PATH.CATEGORIES,
      formData.get('image') as File
    );

    if (isNewItem) {
      await categoryService.create(insertData);
    } else {
      const id = String(formData.get('id'));

      if (!id) {
        throw new Error('Could not edit the record');
      }

      await categoryService.update(insertData, id);
    }

    return redirect(ROUTE_PATH_ADMIN.CATEGORY_LIST);
  } catch (e) {
    console.error('Failed on save the document', e);
    error.message = e.message;
    return json({error}, {status: 404});
  }
}
