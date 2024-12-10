import {z} from 'zod';
import {MapFile, MapImage} from '~/types/file';
import {Product, PRODUCT_TYPE} from '~/types/product';
import {ProductSchema} from '../zod/products.zod';

export const isValidProductType = (
  productType: any
): productType is PRODUCT_TYPE => {
  return typeof productType === 'string';
};

export const productService = {
  findByCategory: async (categoryId: string) => {
    const products = await prisma.product.findMany({
      where: {categoryId: categoryId || ''}
    });

    return products.map((product) => {
      const productType =
        product.productType in PRODUCT_TYPE
          ? product.productType
          : PRODUCT_TYPE.stock;

      return {
        ...product,
        images: JSON.parse(product.images) as MapImage[],
        tags: product.tags ? (JSON.parse(product.tags) as string[]) : [],
        productType: productType as keyof typeof PRODUCT_TYPE,
        storedFile: product.storedFile
          ? (JSON.parse(product.storedFile) as MapFile)
          : null
      } as Product;
    });
  },
  findBySlug: async (slug: string) => {
    // const product = await productModel.findOne({ slug: params.slug }).exec();
    const product = await prisma.product.findFirst({
      where: {
        slug
      }
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return {
      ...product,
      images: JSON.parse(product.images) as MapImage[],
      tags: product.tags ? (JSON.parse(product.tags) as string[]) : [],
      storedFile: product.storedFile
        ? (JSON.parse(product.storedFile) as MapFile)
        : null
    } as Product;
  },
  findWhere: async (where: {[k: string]: string}) => {
    // return await productModel.findOne({ slug: params.slug }).exec();
    const product = await prisma.product.findFirst({
      where: {
        ...where
      }
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return {
      ...product,
      images: JSON.parse(product.images) as MapImage[],
      tags: product.tags ? (JSON.parse(product.tags) as string[]) : [],
      storedFile: product.storedFile
        ? (JSON.parse(product.storedFile) as MapFile)
        : null
    } as Product;
  },
  findMany: async () => {
    const products = await prisma.product.findMany();

    return products.map((product) => {
      const productType =
        product.productType in PRODUCT_TYPE
          ? product.productType
          : PRODUCT_TYPE.stock;

      return {
        ...product,
        images: JSON.parse(product.images) as MapImage[],
        tags: product.tags ? (JSON.parse(product.tags) as string[]) : [],
        productType: productType as keyof typeof PRODUCT_TYPE,
        storedFile: product.storedFile
          ? (JSON.parse(product.storedFile) as MapFile)
          : null
      };
    });
  },
  find: async (id: string): Promise<Product> => {
    const product = await prisma.product.findUnique({
      where: {id}
    });

    if (!product) {
      throw new Error('Could not find the product');
    }

    const productType =
      product.productType in PRODUCT_TYPE
        ? product.productType
        : PRODUCT_TYPE.stock;

    return {
      ...product,
      images: JSON.parse(product.images) as MapImage[],
      tags: product.tags ? (JSON.parse(product.tags) as string[]) : [],
      productType: productType as keyof typeof PRODUCT_TYPE,
      storedFile: product.storedFile
        ? (JSON.parse(product.storedFile) as MapFile)
        : null
    } as Product;
  },
  create: async (data: Omit<Product, 'id'>) => {
    const product = await prisma.product.create({
      data: {
        ...data,
        images: JSON.stringify(data.images),
        tags: JSON.stringify(data.tags),
        storedFile: JSON.stringify(data.storedFile)
      }
    });

    if (!product) {
      throw new Error('Could not save the record');
    }

    return product;
  },
  update: async (data: Omit<Product, 'id'>, id: string) => {
    const product = await prisma.product.update({
      data: {
        ...data,
        images: JSON.stringify(data.images),
        tags: JSON.stringify(data.tags),
        storedFile: JSON.stringify(data.storedFile)
      },
      where: {
        id
      }
    });

    return {success: true, data: product};
  },
  updatePublished: async (isPublished: Product['published'], id: string) => {
    const product = await prisma.product.update({
      data: {published: isPublished},
      where: {id}
    });

    return {success: true, data: product};
  },
  delete: async (id: string) => {
    const product = await prisma.product.delete({
      where: {id}
    });

    if (!product) {
      throw new Error('Could not delete the record');
    }

    return product;
  },
  deleteMongoose: async (form: {[k: string]: FormDataEntryValue}) => {
    // const deleted = await productModel.findOneAndDelete({id});
    // const model = await productModel.findById(form.id);
    // if (model) {
    //   await model?.deleteOne();
    // }
    // return model;
  },
  findWhereMongoose: async (where: {[k: string]: string}) => {
    // return await productModel.findOne({ slug: params.slug }).exec();
  },
  findMongoose: async (id: string) => {
    // return productModel.findOne({id: productId})
  },
  findManyMongoose: async () => {
    // return await productModel.find();
  },
  findByCategoryMongoose: async (categoryId: string) => {
    // return productModel.find().lean();
  },
  createMongoose: async (form: Omit<Product, 'id'>) => {
    // const model = await productModel.create(form);
    // if (!model) {
    //   throw new Error('Could not save the record');
    // }
  },
  updateMongoose: async (data: z.infer<typeof ProductSchema>, id: string) => {
    // const doc = await productModel.findOneAndUpdate(
    //   {_id: toObjectId(id)},
    //   {$set: data},
    //   {new: true}
    // );
    // return {success: true, data: doc};
  }
};
