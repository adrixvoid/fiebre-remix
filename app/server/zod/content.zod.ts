import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {zfd} from 'zod-form-data';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const imageSchema = z
  .any()
  .refine((files) => files?.[0]?.size > 0, 'Image required')
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

export const validation = z.object({
  type: z.string().optional(),
  title: z.string().min(1),
  description: z.string(),
  preview: imageSchema.optional(),
  imageToDelete: zfd.repeatable(),
  tags: z.string().optional(),
  slug: z.string().optional(),
  draft: z.string().transform((value) => value === 'draft'),
  referrer: z.string().optional()
});

export const formValidator = withZod(validation);
