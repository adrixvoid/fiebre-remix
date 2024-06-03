import {z} from 'zod';
import {withZod} from '@remix-validated-form/with-zod';
import {zfd} from 'zod-form-data';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const imageSchema = z
  .any()
  // .refine((files) => files?.[0]?.size > 0, 'Image required')
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

export const validation = z
  .object({
    id: z.string(),
    title: z.string().min(1),
    description: z.string(),
    priceHidden: z.coerce.boolean(),
    priceInCents: z.coerce.number().int().default(0),
    productType: z.union([
      z.literal('stock'),
      z.literal('downloadUrl'),
      z.literal('file')
    ]),
    stock: z.coerce.number().int().optional(),
    downloadUrl: z.string().url().optional(),
    file: z.instanceof(File).optional(),
    images: imageSchema.optional(),
    toDelete: zfd.repeatable(),
    tags: z.string().optional(),
    slug: z.string().optional(),
    draft: z.string().transform((value) => value === 'draft'),
    categoryId: z.string().optional(),
    referrer: z.string().optional()
  })
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
      data.productType === 'stock' && data.stock ? data.stock >= 0 : true,
    {
      message: 'Stock have at least 1 product',
      path: ['stock', 'productType']
    }
  )
  .refine(
    (data) =>
      data.productType === 'downloadUrl' ? data.downloadUrl !== '' : true,
    {
      message: 'Should have a valid URL',
      path: ['downloadUrl', 'productType']
    }
  )
  .refine(
    (data) => (data.productType === 'file' ? Boolean(data?.file?.size) : true),
    {
      message: 'File Required',
      path: ['file', 'productType']
    }
  );

export const productValidator = withZod(validation);
