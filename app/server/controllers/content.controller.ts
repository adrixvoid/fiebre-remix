import {
  type ActionFunctionArgs,
  redirect,
  NodeOnDiskFile
} from '@remix-run/node';

import {
  createContent,
  type MarkdownPost
} from '~/server/controllers/markdown.controller';
import {
  mapFile,
  uploadFilesAction
} from '~/server/controllers/upload.controller';
import {productService} from '~/server/models/products.model';
import {slugify} from '~/utils/url';
import {ASSET_PATH} from '~/constants';
import {categoryService} from '~/server/models/categories.model';

const prepareInsertProduct = (formData: {[k: string]: FormDataEntryValue}) => ({
  title: formData.title as string,
  body: formData.body as string,
  price: formData.price as unknown as number,
  stock: formData.stock as unknown as number,
  priceHidden: !!formData.priceHidden,
  tags: formData.tags as unknown as string[],
  downloadUrl: formData.downloadUrl as string,
  published: !formData.draft
});

function prepareMarkdownPost(formData: {[k: string]: FormDataEntryValue}) {
  const {preview, images, ...data} = formData;
  const post: MarkdownPost = {
    type: data.type as string,
    title: data.title as string,
    slug: slugify((data.slug || data.title) as string),
    body: data.body as string,
    categories: data.categories as string,
    draft: !!data.draft
  };

  return post;
}

export async function contentAction({request}: ActionFunctionArgs) {
  const clonedRequest = request.clone();
  const formData = await request.formData();
  const fromEntries = Object.fromEntries(formData);

  const markdownSubfolder =
    fromEntries.type !== 'products' ? `/${fromEntries.type}` : '';
  const imageRelativePath = `${ASSET_PATH.MARKDOWN}${markdownSubfolder}`;
  const multipartData = await uploadFilesAction(clonedRequest, {
    relativePath: imageRelativePath
  });
  const previewData = multipartData.getAll('preview') as NodeOnDiskFile[];
  const imagesData = multipartData.getAll('images') as NodeOnDiskFile[];

  const resultImages = {
    preview: mapFile(previewData[0]),
    images: imagesData.map((imageData) => mapFile(imageData))
  };

  if (fromEntries.type === 'products') {
    const insertData = prepareInsertProduct(fromEntries);

    await productService.create({
      slug: slugify((fromEntries.slug || fromEntries.title) as string),
      ...insertData,
      ...resultImages
    });
  } else {
    const insertData = prepareMarkdownPost(fromEntries);

    createContent({
      ...insertData,
      ...resultImages,
      preview: resultImages.preview.url,
      slug: slugify((fromEntries.slug || fromEntries.title) as string)
    });
  }

  return redirect('/admin/markdown/create', {status: 303});
}

export async function contentLoader() {
  const categories = await categoryService.listPopulated();
  return {loaded: true, categories};
}
