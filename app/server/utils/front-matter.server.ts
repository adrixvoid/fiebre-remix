import path from 'path';
import fs from 'fs/promises';
import fm from 'front-matter';

export type MarkdownDocument = {
  slug: string;
  title: string;
  tags?: string[];
  preview?: string;
  categories?: string;
  body?: string;
};

export type FMAttributes = {
  title: string;
  categories: string;
};

export type FMConfigPageFolders = {
  title: string;
  path: string;
};

export type ContentType = 'posts' | 'blog' | 'products' | 'pages';

/**
 * Read the frontmatter.json file
 * it reads frontmatter.frontMatter.content.pageFolders property
 * @returns
 * @example
 * returns [{title: 'post', path: 'app/content/posts'}, {title: 'blog', path: 'app/content/blog'}, {title: 'product', path: 'app/content/products'}]
 */
async function readFrontMatterConfig(): Promise<FMConfigPageFolders[]> {
  const directory = path.join(process.cwd(), 'frontmatter.json');

  // Read the frontmatter.json file
  const frontmatterContent = await fs.readFile(directory, 'utf8');

  // Parse the JSON content
  const frontmatter = JSON.parse(frontmatterContent);

  // Access the frontMatter.content.pageFolders property
  const pageFolders = frontmatter['frontMatter.content.pageFolders'];

  return pageFolders.map((item: FMConfigPageFolders) => {
    if (!item.title || !item.path) {
      throw new Error('Invalid frontmatter');
    }

    // replace the [[workspace]] with the current workspace directory
    let itemPath = item.path.replace('[[workspace]]', process.cwd());

    console.log('itemPath', itemPath);

    return {
      title: item.title,
      path: itemPath,
    };
  });
}

/**
 * Get the directory of the markdown files
 * @param type
 * @returns
 * @example
 * getDirectoryFromType('post') // returns 'app/content/posts'
 * getDirectoryFromType('blog') // returns 'app/content/blog'
 * getDirectoryFromType('product') // returns 'app/content/products'
 * getDirectoryFromType('invalid') // returns ''
 * 
 * switch (type) {
    case "post":
      return MARKDOWN_PATH.POST;
    case "blog":
      return MARKDOWN_PATH.BLOG;
    case "product":
        return MARKDOWN_PATH.PRODUCT;
    default:
      throw new Error("Invalid type");
  }
*/
export async function getDirectoryFromType(type: ContentType): Promise<string> {
  try {
    const pageFolders = await readFrontMatterConfig();
    const pageFolder = pageFolders.find(
      (item: FMConfigPageFolders) => item.title === type,
    );

    if (!pageFolder) {
      throw new Error('Invalid type');
    }

    return pageFolder.path;
  } catch (error) {
    console.log('error', error);
    throw new Error('Invalid type');
  }
}

export const isValidMarkdownAttributes = (
  attributes: any,
): attributes is FMAttributes => {
  return typeof attributes.title === 'string';
};

export async function getMarkdownDocument(
  directory: string,
  fileName: string,
): Promise<MarkdownDocument> {
  const file = await fs.readFile(path.join(directory, fileName), 'utf-8');
  const {attributes, body} = fm<MarkdownDocument>(file.toString());

  if (!isValidMarkdownAttributes(attributes)) {
    throw new Error('Invalid attributes');
  }

  return {
    slug: fileName.replace('.md', ''),
    title: attributes.title,
    categories: attributes.categories,
    preview: attributes.preview,
    body: body || '',
  };
}

export async function getAllFromDirectory(
  type: ContentType,
): Promise<MarkdownDocument[]> {
  try {
    const directory = await getDirectoryFromType(type);
    const fileNames = await fs.readdir(directory);
    const files = Promise.all(
      fileNames.map(async (fileName) => {
        return await getMarkdownDocument(directory, fileName);
      }),
    );
    return files;
  } catch (error) {
    console.log(`Directory ${type} does not exist or invalid path`);
    return [];
  }
}

export async function readMarkdownDocument(
  type: ContentType,
  fileName: string,
): Promise<MarkdownDocument> {
  try {
    const directory = await getDirectoryFromType(type);
    return await getMarkdownDocument(directory, fileName);
  } catch (error) {
    throw new Error('Cannot read document');
  }
}
