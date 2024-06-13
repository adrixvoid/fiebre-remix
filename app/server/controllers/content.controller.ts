import {
  type ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect
} from '@remix-run/node';

import markdownService from '~/server/services/markdown.service';
import {slugify} from '~/lib/url';
import {ASSET_PATH} from '~/constants';
import categoryModel from '~/server/schema/category.schema';
import {fileService} from '../services/file.service';
import path from 'path';
import {MarkdownDocument} from '../utils/front-matter';
import {formValidator} from '../zod/content.zod';

export const PARAMS = {
  ID: 'id'
};

const prepareMarkdownInsert = (formData: {
  [k: string]: FormDataEntryValue;
}) => ({
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

  // const preview = await fileService.save(ASSET_PATH.CONTENT, formData.get('preview'));
  // const images = await fileService.saveAll(ASSET_PATH.CONTENT, formData.get('images'));

  // Object.assign(insertData, {
  //   preview,
  //   images
  // });

  Object.assign(insertData, prepareMarkdownInsert(fromEntries));
  await markdownService.create(insertData);

  return redirect('/admin/markdown/create', {status: 303});
}

export interface LoaderAdminContent {
  content?: MarkdownDocument;
}

export async function contentLoader({
  request,
  params
}: LoaderFunctionArgs): Promise<LoaderAdminContent> {
  const url = new URL(request.url);
  const id = params[PARAMS.ID];
  const referrer = url.searchParams.get('referrer');

  console.log('id', id);
  console.log('referrer', referrer);

  // const categories = await categoryModel
  //   .find({
  //     parentId: null
  //   })
  //   .populate({
  //     path: 'subcategories',
  //     populate: {
  //       path: 'subcategories'
  //     }
  //   })
  //   .populate('parent')
  //   .exec();

  return {content: undefined};
}
