import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  NodeOnDiskFile,
  redirect,
  json
} from '@remix-run/node';

import {
  categoryService,
  type Breadcrumb
} from '~/server/models/categories.model';
import {ADMIN_ROUTE_PATH, ASSET_PATH} from '~/constants';
import {
  MapFile,
  mapFile,
  uploadFilesAction
} from '~/server/controllers/upload.controller';
import {CategoryDocument} from '~/server/models/schema/category.schema';

export interface CategoryFormFields {
  name?: string;
  parentId?: string;
  slug?: string;
  path?: string;
  cover?: string;
}

export interface ValidationErrorForm {
  message: string | undefined;
  fields: {[k: string]: string};
}

export interface CategoryActionData {
  error: ValidationErrorForm;
}

export interface LoaderAdminCategoryList {
  category?: CategoryDocument;
  list: CategoryDocument[];
  breadcrumb?: Breadcrumb[];
}

export async function loaderList(): Promise<LoaderAdminCategoryList> {
  const list = await categoryService.list({
    parentId: null
  });
  return {list, breadcrumb: undefined, category: undefined};
}

export async function loaderSubcategory({
  params
}: LoaderFunctionArgs): Promise<LoaderAdminCategoryList> {
  const path = params['*'] as string;
  const {category, breadcrumb} = await categoryService.listFromPath(path);
  const subcategories = category?.subcategories || [];

  return {category, list: subcategories, breadcrumb};
}

export async function loaderCreate({}: LoaderFunctionArgs) {
  const categories = await categoryService.list();
  return {categories};
}

export async function loaderEdit({params}: LoaderFunctionArgs) {
  const id = params.id as string;
  const {categories, category} = await categoryService.listEditable(id);
  return {category: category?.toJSON(), categories};
}

export async function actionList({request}: ActionFunctionArgs) {
  let formData = await request.formData();
  let entries = Object.fromEntries(formData);
  console.log('entries', entries);
  // const docs = await shoppingCartAction(request);
  return json({ok: true});
}

export async function actionDelete({request}: ActionFunctionArgs) {
  try {
    let formData = await request.formData();
    let entries = Object.fromEntries(formData);

    if (!entries.id) {
      throw new Error('The id is required');
    }

    const entry = await categoryService.delete(entries);
    return json({ok: true});
  } catch (error) {
    return json(error.message, {status: 404});
  }
}

export async function actionCreateOrUpdate({request}: ActionFunctionArgs) {
  console.log('actionCreateOrUpdate', request);
  const clonedRequest = request.clone();
  const formData = await request.formData();
  const fromEntries = Object.fromEntries(formData);

  const error: ValidationErrorForm = {
    message: undefined,
    fields: {}
  };

  try {
    const isNewItem = (fromEntries._action as string).includes(
      ADMIN_ROUTE_PATH.CATEGORY_CREATE
    );

    // prepare insert values
    const insertData = {
      id: undefined,
      name: String(formData.get('name')),
      parentId: String(formData.get('parentId')),
      cover: <MapFile | undefined>undefined
    };

    if (insertData.name.length === 0) {
      error.fields.name = 'required';
    }

    if (Object.keys(error.fields).length > 0) {
      return json({error});
    }

    // uploadImages
    console.log(clonedRequest);
    const multipartData = await uploadFilesAction(clonedRequest, {
      relativePath: ASSET_PATH.CATEGORIES
    });
    const coverData = multipartData.getAll('cover') as NodeOnDiskFile[];
    if (coverData[0]) {
      insertData.cover = mapFile(coverData[0]);
    }

    let model;

    if (isNewItem) {
      model = await categoryService.create(insertData);

      if (!model) {
        throw new Error('Failed on creating the document');
      }
    } else {
      const id = String(formData.get('id'));
      if (id) {
        model = await categoryService.update(Object.assign(insertData, {id}));

        if (!model) {
          throw new Error('Could not edit the record');
        }
      } else {
        throw new Error('Could not edit the record');
      }
    }

    return redirect(ADMIN_ROUTE_PATH.CATEGORY_LIST);
  } catch (e) {
    console.error('categories create or update error', e);
    error.message = e.message;
    return json({error}, {status: 404});
  }
}
