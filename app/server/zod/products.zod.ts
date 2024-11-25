import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {zfd} from 'zod-form-data';
import {PRODUCT_TYPE} from '~/types/product';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const imageMultiSchema = z
  .any()
  .refine(
    (files) =>
      files?.[0]?.size > 0 ? files?.[0]?.size <= MAX_FILE_SIZE : true,
    `Max image size is 5MB.`
  )
  .refine(
    (files) =>
      files?.[0]?.size > 0 ? files?.[0]?.type.startsWith('image/') : true,
    'Only .jpg, .jpeg, .png and .webp formats are supported.'
  );

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  description: z.string(),
  priceHidden: z.coerce.boolean(),
  priceInCents: z.coerce.number().int().default(0),
  images: imageMultiSchema.optional(),
  tags: z.string().optional(),
  published: z.coerce.boolean(),
  slug: z.string().optional(),

  productType: z.union([
    z.literal(PRODUCT_TYPE.stock),
    z.literal(PRODUCT_TYPE.externalUrl),
    z.literal(PRODUCT_TYPE.storedFile)
  ]),
  stock: z.coerce.number().int().optional(),
  externalUrl: z.string().url().optional(),
  storedFile: z.instanceof(File).optional(),

  categoryId: z.string()
});

export const FormSchema = z.object({
  imagesToDelete: zfd.repeatable().optional(),
  referrer: z.string().optional()
});

export const productSchemaValidator = withZod(
  FormSchema.merge(ProductSchema)
    .refine(
      (data) =>
        !data.priceHidden && data.priceInCents ? data.priceInCents > 0 : true,
      {
        message: 'Price must be greater than 0 when priceHidden is false',
        path: ['price']
      }
    )
    .refine(
      (data) =>
        data.productType === PRODUCT_TYPE.stock && data.stock
          ? data.stock >= 0
          : true,
      {
        message: 'Stock have at least 1 product',
        path: [PRODUCT_TYPE.stock, 'productType']
      }
    )
    .refine(
      (data) =>
        data.productType === PRODUCT_TYPE.externalUrl
          ? data.externalUrl !== ''
          : true,
      {
        message: 'Should have a valid URL',
        path: [PRODUCT_TYPE.externalUrl, 'productType']
      }
    )
    .refine(
      (data) =>
        data.productType === PRODUCT_TYPE.storedFile
          ? Boolean(data?.storedFile?.size)
          : true,
      {
        message: 'File Required',
        path: [PRODUCT_TYPE.storedFile, 'productType']
      }
    )
    .refine((data) => data.categoryId, {
      message: 'Category Required',
      path: ['categoryId']
    })
);
