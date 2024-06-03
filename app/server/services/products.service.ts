import type {Product} from '~/types/global.type';
import productModel from '../schema/product.schema';
import {slugify} from '~/lib/url';
import {toObjectId} from '../utils/mongoose';

export const productService = {
  find: async () => {
    return productModel.find().lean();
  },
  update: async (data: {[k: string]: any}, id: string) => {
    const doc = await productModel.findOneAndUpdate(
      {_id: toObjectId(id)},
      {$set: data},
      {new: true}
    );

    return {success: true, record: doc};
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

    const model = await productModel.create(form);
    if (!model) {
      throw new Error('Could not save the record');
    }
  }
};
