import path from 'path';
import fs from 'fs/promises';

import {
  getDirectoryFromType,
  readMarkdownDocument,
  type MarkdownDocument,
  type ContentType,
} from './utils/front-matter.server';
import {parse} from './utils/marked.server';

export const getContent = async (
  type: ContentType,
  slug: string,
): Promise<MarkdownDocument> => {
  const file = await readMarkdownDocument(type, `${slug}.md`);
  if (file.body) {
    file.body = await parse(file.body);
  }
  return file;
};

interface Post extends MarkdownDocument {
  type: string;
}

export const createContent = async (post: Post): Promise<boolean> => {
  try {
    console.log(post);
    // if directory does not exist, create it
    const directory = await getDirectoryFromType(post.type as ContentType);

    // if file already exists, throw error
    const fileNames = await fs.readdir(directory);
    const fileName = `${post.slug}.md`;
    if (fileNames.includes(fileName)) {
      throw new Error('File already exists');
    }

    // create file
    const markdown = `---
title: ${post.title}
categories: ${post.categories}
preview: ${post.preview}
---
${post.body}
`;
    await fs.writeFile(path.join(directory, `${post.slug}.md`), markdown);
    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

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
