import type {Product} from '~/types/global.type';
import productModel from '../schema/product.schema';
import {slugify} from '~/utils/url';

export const productService = {
  find: async () => {
    return productModel.find().lean();
  },
  update: async (form: {[k: string]: FormDataEntryValue}) => {
    const model = await productModel.findById(form.id);
    if (!model) {
      throw new Error('data not found');
    }
    await model.save();
    return model;
  },
  delete: async (form: {[k: string]: FormDataEntryValue}) => {
    const model = await productModel.findById(form.id);
    if (model) {
      await model?.deleteOne();
    }
    return model;
  },
  create: async (
    form: Omit<Product, '_id' | 'slug' | 'tags'> & {
      slug?: string;
      tags?: string | string[];
    }
  ) => {
    form.slug = slugify(form.slug || form.title);

    if (form.tags) {
      if (form.tags instanceof String) {
        form.tags = [form.tags] as string[];
      }
    } else {
      form.tags = [];
    }

    console.log('SAVE FORM TO MONGO', form);

    const model = await productModel.create(form);
    if (!model) {
      throw new Error('Could not save the record');
    }
  }
};

export async function getProduct(slug: string) {
  const product = await productModel.findOne({slug: slug}).exec();
  return product;
}
