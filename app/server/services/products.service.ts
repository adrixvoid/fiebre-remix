import {z} from 'zod';
import {toObjectId} from '~/server/lib/mongoose';
import productModel from '~/server/mongoose/schema/product.schema';
import {Product} from '~/types/product';
import {ProductSchema} from '../zod/products.zod';

export const productService = {
  find: async () => {
    return productModel.find().lean();
  },
  create: async (form: Omit<Product, 'id'>) => {
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
