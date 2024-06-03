import type {LoaderFunctionArgs} from '@remix-run/node';
import {json} from '@remix-run/node';

import markdownService from '~/server/services/markdown.service';

export async function loader({params}: LoaderFunctionArgs) {
  const slug = params.slug as string;
  if (!slug) {
    return json({message: 'Not found'}, {status: 404});
  }
  const content = await markdownService.read('posts', slug);
  return json({status: 200, content}, {status: 200});
}
