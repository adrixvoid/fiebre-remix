import fs from 'fs/promises';
import path from 'path';

import {parse} from '~/lib/marked';
import {sanitizeUrl} from '~/lib/sanitizeUrl';
import {
  type MarkdownDocument,
  MarkdownPost,
  type MarkdownType,
  getDocument,
  getDocuments,
  getPath,
  markdownTemplate
} from '~/server/lib/front-matter';

const markdownService = {
  readOne: async (url: string): Promise<MarkdownDocument | null> => {
    const locationPath = sanitizeUrl(url)
      .replace(/(^\/)|(\/$)/, '')
      .split('/');
    const markdownDocument = await getDocument(
      locationPath[0],
      `${locationPath[1]}.md`
    );
    if (!markdownDocument) {
      return null;
    }
    markdownDocument.body = await parse(markdownDocument.body || '');
    return markdownDocument;
  },
  readOneByType: async (
    type: MarkdownType,
    slug: string
  ): Promise<MarkdownDocument | undefined> => {
    const file = await getDocument(type, `${slug}.md`);
    if (file?.body) {
      file.body = await parse(file.body);
      return file;
    } else {
      return undefined;
    }
  },
  readAllByType: async (type: string): Promise<MarkdownDocument[] | null> => {
    const documents = await getDocuments(type);
    return documents;
  },
  create: async (post: MarkdownPost): Promise<boolean> => {
    try {
      // if directory does not exist, create it
      const directory = await getPath(post.type as MarkdownType);

      if (!directory) {
        return false;
      }

      // if file already exists, throw error
      const fileNames = await fs.readdir(directory);
      const fileName = `${post.slug}.md`;
      if (fileNames.includes(fileName)) {
        throw new Error('File already exists');
      }

      // create file
      const markdown = markdownTemplate(post);
      await fs.writeFile(path.join(directory, `${post.slug}.md`), markdown);
      return true;
    } catch (error) {
      console.error(`MARKDOWN ERROR:`, error.message);
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

//       return metadata;
//   }));
//   return posts;
// }
