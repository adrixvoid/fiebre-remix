import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {zfd} from 'zod-form-data';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];
const imageMultiSchema = z
  .array(z.custom<File>())
  .refine(
    (files) =>
      files?.[0]?.size > 0 ? files?.[0]?.size <= MAX_FILE_SIZE : true,
    `Max image size is 5MB.`
  )
  .refine(
    (files) =>
      files?.[0]?.size > 0 ? files?.[0]?.type.startsWith('image/') : true,
    'Only .jpg, .jpeg, .png and .webp formats are supported.'
  )
  .refine(
    (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
    'Only these types are allowed .jpg, .jpeg, .png and .webp'
  );

const imageSchema = z
  .custom<File>()
  .refine(
    (file) => (file?.size > 0 ? file?.size <= MAX_FILE_SIZE : true),
    `Max image size is 5MB.`
  )
  .refine(
    (file) => (file?.size > 0 ? file?.type.startsWith('image/') : true),
    'Only .jpg, .jpeg, .png and .webp formats are supported.'
  )
  .refine(
    (file) =>
      file?.size > 0 ? ACCEPTED_IMAGE_TYPES.includes(file.type) : true,
    'Only these types are allowed .jpg, .jpeg, .png and .webp'
  );

export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  image: imageSchema.optional(),
  parentId: z.string().nullable(),
  active: zfd.checkbox()
  // categoryId: z.string().optional()
});

const FormSchema = z.object({
  imageToDelete: z.string().optional(),
  referrer: z.string().optional()
});

export const categoryValidator = withZod(FormSchema.merge(CategorySchema));
