import {MarkdownDocument} from '~/server/lib/front-matter';

export interface Post extends MarkdownDocument {
  type: string;
  images?: {
    name: string;
    url: string;
  }[];
  preview?: string;
  categories?: string;
  draft?: boolean;
  description: string;
}
