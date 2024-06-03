import path from 'path';
import fs from 'fs/promises';

import {
  getDirectoryPath,
  readMarkdownDocument,
  type MarkdownDocument,
  type ContentType
} from '../utils/front-matter';
import {parse} from '../utils/marked';
import {slugify} from '~/lib/url';

export interface MarkdownPost extends MarkdownDocument {
  type: string;
  images?: {
    name: string;
    url: string;
  }[];
}

// ${images?.map((image) => formatImage(image.url, image.name)).join('\n')}
function formatImage(url: string, name: string): string {
  return `![${name}](${url})`;
}

export const template = ({
  title,
  categories,
  preview,
  body,
  images,
  draft
}: MarkdownPost): string => `---
title: ${title}
slug: ${slugify(title)}
categories: ${categories}
preview: ${preview}
draft: ${draft}
images: ${JSON.stringify(images)}
---
${body}
`;

const markdownService = {
  read: async (
    type: ContentType,
    slug: string
  ): Promise<MarkdownDocument | undefined> => {
    const file = await readMarkdownDocument(type, `${slug}.md`);
    if (file?.body) {
      file.body = await parse(file.body);
      return file;
    } else {
      return undefined;
    }
  },
  create: async (post: MarkdownPost): Promise<boolean> => {
    try {
      // if directory does not exist, create it
      const directory = await getDirectoryPath(post.type as ContentType);

      // if file already exists, throw error
      const fileNames = await fs.readdir(directory);
      const fileName = `${post.slug}.md`;
      if (fileNames.includes(fileName)) {
        throw new Error('File already exists');
      }

      // create file
      const markdown = template(post);
      await fs.writeFile(path.join(directory, `${post.slug}.md`), markdown);
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }
};

export default markdownService;

// export const getCategories = async (): Promise<Post[]> => {
//   const fileNames = await fs.readdir(postPath);
//   const posts = Promise.all(fileNames.map(async (fileName) => {
//       const file = await fs.readFile(path.join(postPath, fileName), "utf-8");
//       const {attributes} = fm<Post>(file.toString())

//       if (!isValidMarkdownAttributes(attributes)) {
//           throw new Error("Invalid post attributes");
//       }

//       const metadata = {
//         slug: fileName.replace(".md", ""),
//         title: attributes.title,
//         categories: attributes.categories,
//         preview: attributes.preview,
//       };

//       console.log('metadata', metadata)

//       return metadata;
//   }));
//   return posts;
// }
