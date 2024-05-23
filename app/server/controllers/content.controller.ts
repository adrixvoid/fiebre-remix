import {type ActionFunctionArgs, redirect} from '@remix-run/node';

import markdownService from '~/server/services/markdown.service';
import {productService} from '~/server/models/products.model';
import {slugify} from '~/utils/url';
import {ASSET_PATH} from '~/constants';
import categoryModel from '~/server/models/schema/category.schema';
import {uploadService} from '../services/upload.service';
import path from 'path';

const prepareInsertProduct = (formData: {[k: string]: FormDataEntryValue}) => ({
  title: formData.title as string,
  body: formData.body as string,
  slug: slugify((formData.slug || formData.title) as string),
  price: formData.price as unknown as number,
  stock: formData.stock as unknown as number,
  priceHidden: !!formData.priceHidden,
  tags: formData.tags as unknown as string[],
  downloadUrl: formData.downloadUrl as string,
  published: !formData.draft
});

const prepareMarkdownPost = (formData: {[k: string]: FormDataEntryValue}) => ({
  title: formData.title as string,
  body: formData.body as string,
  slug: slugify((formData.slug || formData.title) as string),
  categories: formData.categories as string,
  type: formData.type as string,
  draft: !!formData.draft
});

export async function contentAction({request}: ActionFunctionArgs) {
  const clonedRequest = request.clone();
  const formData = await request.formData();
  const fromEntries = Object.fromEntries(formData);
  const insertData = {
    title: '',
    price: 0,
    preview: undefined,
    images: [],
    slug: slugify((fromEntries.slug || fromEntries.title) as string),
    type: ''
  };

  const preview = await uploadService.saveFile(
    ASSET_PATH.CONTENT,
    formData.preview
  );
  const images = await uploadService.saveFiles(
    ASSET_PATH.CONTENT,
    formData.images
  );

  Object.assign(insertData, {
    preview,
    images
  });

  if (fromEntries.type === 'products') {
    Object.assign(insertData, prepareInsertProduct(fromEntries));
    await productService.create(insertData);
  } else {
    Object.assign(insertData, prepareMarkdownPost(fromEntries));
    await markdownService.create(insertData);
  }

  return redirect('/admin/markdown/create', {status: 303});
}

export async function contentLoader() {
  const categories = await categoryModel
    .find({
      parentId: null
    })
    .populate({
      path: 'subcategories',
      populate: {
        path: 'subcategories'
      }
    })
    .populate('parent')
    .exec();

  return {loaded: true, categories};
}
