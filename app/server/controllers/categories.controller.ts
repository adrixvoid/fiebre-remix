import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  json
} from '@remix-run/node';

import {categoryService} from '~/server/services/category.service';
import {ADMIN_ROUTE_PATH, ASSET_PATH} from '~/constants';
import categoryModel, {CategoryDocument} from '~/server/schema/category.schema';
import productModel from '~/server/schema/product.schema';

import {sanitizeUrl} from '~/lib/sanitizeUrl';
import {getBreadcrumb} from '~/lib/breadcrumb';
import {Breadcrumb, Category, MapFile, Product} from '~/types/global.type';
import {fileService} from '../services/file.service';

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
  category?: CategoryDocument;
  list: CategoryDocument[];
  breadcrumb?: Breadcrumb[];
  products: Product[];
}

export const CATEGORY_PARAMS = {
  PARENT: 'parent'
};

export async function loaderAdminCategoriesList({
  params
}: LoaderFunctionArgs): Promise<AdminCategoryLoaderList> {
  const path = params['*'] as string;

  if (Boolean(path)) {
    const result = await getSubcategory(path);
    return result;
  }

  const list = await categoryModel.find({
    parentId: null
  });

  const products = await productModel.find({
    categories: []
  });
  // const products = await productModel.find({$where:'this.categories.length>0'});

  return {list, breadcrumb: [], category: undefined, products};
}

export async function getSubcategory(
  path: string
): Promise<AdminCategoryLoaderList> {
  const categories = (await categoryModel
    .find()
    .populate('subcategories')
    .exec()) as CategoryDocument[];

  const category = categories.find(
    (d: CategoryDocument) => d.path === sanitizeUrl(path)
  );

  const products = await productModel.find({
    categories: {$in: [category?._id]}
  });
  // .where('likes').in(['vaporizing', 'talking']);

  const breadcrumb = getBreadcrumb<CategoryDocument>(
    category?.path,
    categories
  );

  const subcategories = category?.subcategories || [];

  return {category, list: subcategories, breadcrumb, products};
}

export async function loaderAdminCategoriesCreate({
  params
}: LoaderFunctionArgs) {
  const categories = await categoryModel.find();
  return {categories};
}

export async function loaderAdminCategoriesEdit({params}: LoaderFunctionArgs) {
  const id = params.id as string;

  const categories = await categoryModel
    .find()
    .populate('subcategories')
    .exec();

  const category = categories.find((c) => c.toJSON().id === sanitizeUrl(id));

  let filteredCategories: CategoryDocument[] = [];
  if (category) {
    filteredCategories = categories.filter(
      (c) => !c.path.includes(category.path)
    );
  }

  return {category: category?.toJSON(), categories: filteredCategories};
}

export async function actionAdminCategoriesList({request}: ActionFunctionArgs) {
  let formData = await request.formData();
  let entries = Object.fromEntries(formData);
  console.log('entries', entries);
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

    const deletedCategory = await categoryModel.findOneAndDelete({
      _id: id
    });

    return json({ok: true, category: deletedCategory});
  } catch (error) {
    return json(error.message, {status: 404});
  }
}

export async function actionAdminCategoriesCreateUpdate({
  request
}: ActionFunctionArgs) {
  const formData = await request.formData();
  const fromEntries = Object.fromEntries(formData);

  const error: ValidationErrorForm = {
    message: undefined,
    fields: {}
  };

  const isNewItem = (fromEntries._action as string).includes(
    ADMIN_ROUTE_PATH.CATEGORY_CREATE
  );

  const insertData = {
    id: undefined,
    name: String(formData.get('name')),
    parentId: String(formData.get('parentId')),
    image: <MapFile | undefined>undefined
  };

  if (insertData.name.length === 0) {
    error.fields.name = 'required';
  }

  if (Object.keys(error.fields).length > 0) {
    return json({error});
  }

  insertData.image = await fileService.save(
    ASSET_PATH.CATEGORIES,
    formData.get('image') as File
  );

  if (isNewItem) {
    await categoryService.create(insertData);
  } else {
    const id = String(formData.get('id'));

    if (!id) {
      json({error: new Error('Could not edit the record')}, {status: 500});
    }

    await categoryService.update(Object.assign(insertData, {id}));
  }

  fileService.deleteAll(formData.getAll('toDelete') as string[]);

  // return json({error: 'test'});
  return redirect(ADMIN_ROUTE_PATH.CATEGORY_LIST);
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
      ADMIN_ROUTE_PATH.CATEGORY_CREATE
    );

    const insertData = {
      id: undefined,
      name: String(formData.get('name')),
      parentId: String(formData.get('parentId')),
      image: <MapFile | undefined>undefined
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

      await categoryService.update(Object.assign(insertData, {id}));
    }

    return redirect(ADMIN_ROUTE_PATH.CATEGORY_LIST);
  } catch (e) {
    console.error('Failed on save the document', e);
    error.message = e.message;
    return json({error}, {status: 404});
  }
}
