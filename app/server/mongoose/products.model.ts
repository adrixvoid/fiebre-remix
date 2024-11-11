import {z} from 'zod';
import {slugify} from '~/lib/url';
import {toObjectId} from '~/server/lib/mongoose';
import productModel from '~/server/mongoose/schema/product.schema';
import {ProductSchema} from '../zod/products.zod';

export const productService = {
  find: async () => {
    return productModel.find().lean();
  },
  create: async (form: z.infer<typeof ProductSchema>) => {
    form.slug = slugify(form.slug || form.name);

    // if (form.tags) {
    //   if (form.tags instanceof String) {
    //     form.tags = [form.tags] as string[];
    //   }
    // } else {
    //   form.tags = [];
    // }

    const model = await productModel.create(form);
    if (!model) {
      throw new Error('Could not save the record');
    }
  },
  update: async (data: z.infer<typeof ProductSchema>, id: string) => {
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
  }
};
