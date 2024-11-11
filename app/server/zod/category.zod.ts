import {withZod} from '@remix-validated-form/with-zod';
import {z} from 'zod';
import {zfd} from 'zod-form-data';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const imageSchema = z
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

export const categorySchemaValidator = withZod(
  z.object({
    id: z.string(),
    name: z.string().min(1),
    image: imageSchema.optional(),
    parentId: z.string().optional(),
    active: zfd.checkbox(),
    categoryId: z.string().optional(),
    referrer: z.string().optional()
  })
);
