import path from 'path';
import fs from 'fs/promises';
import fm from 'front-matter';

export type MarkdownDocument = {
  slug: string;
  title: string;
  draft?: boolean;
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
 * returns [{title: 'post', path: 'app/markdown/posts'}, {title: 'blog', path: 'app/markdown/blog'}, {title: 'product', path: 'app/markdown/products'}]
 */
async function readFrontMatterFile(): Promise<FMConfigPageFolders[]> {
  const directory = path.join(process.cwd(), 'frontmatter.json');

  // Read the frontmatter.json file
  const frontmatterContent = await fs.readFile(directory, 'utf8');

  // Parse the JSON content
  const frontmatter = JSON.parse(frontmatterContent);

  return frontmatter;
}

function getPageFolderList(frontmatter: any): FMConfigPageFolders[] {
  // Access the frontMatter.content.pageFolders property
  const pageFolders: FMConfigPageFolders[] =
    frontmatter['frontMatter.content.pageFolders'];

  return pageFolders.map(replaceDirectoryPath);
}

// replace the [[workspace]] placeholder with the current workspace directory
export function replaceDirectoryPath(
  item: FMConfigPageFolders
): FMConfigPageFolders {
  if (!item.path) {
    return item;
  }

  return {
    ...item,
    path: item.path.replace('[[workspace]]', process.cwd())
  };
}

export function findDirectory(
  directories: FMConfigPageFolders[],
  type: ContentType
): FMConfigPageFolders | undefined {
  return directories.find((item: FMConfigPageFolders) => item.title === type);
}

/**
 * Get the directory of the markdown files
 * @param type
 * @returns
 * @example
 * getDirectoryPath('post') // returns 'app/markdown/posts'
 * getDirectoryPath('blog') // returns 'app/markdown/blog'
 * getDirectoryPath('product') // returns 'app/markdown/products'
 * getDirectoryPath('invalid') // returns ''
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
export async function getDirectoryPath(type: ContentType): Promise<string> {
  const frontmatter = await readFrontMatterFile();
  const pageFolders = getPageFolderList(frontmatter);
  return findDirectory(pageFolders, type)?.path || '';
}

export const isValidMarkdownAttributes = (
  attributes: any
): attributes is FMAttributes => {
  console.log('isValidMarkdownAttributes');
  return typeof attributes.title === 'string';
};

export async function getMarkdownDocument(
  path: string
): Promise<MarkdownDocument> {
  const file = await fs.readFile(path, 'utf-8');
  const {attributes, body} = fm<MarkdownDocument>(file.toString());

  if (!isValidMarkdownAttributes(attributes)) {
    throw new Error('Invalid attributes');
  }

  return {
    slug: path.replace('.md', '').split('/').pop() || path.replace('.md', ''),
    title: attributes.title,
    categories: attributes.categories,
    preview: attributes.preview,
    body: body || ''
  };
}

export async function getMarkdowns(
  type: ContentType
): Promise<MarkdownDocument[]> {
  try {
    const directory = await getDirectoryPath(type);
    const fileNames = await fs.readdir(directory);
    const files = await Promise.all(
      fileNames
        .map(async (fileName) => {
          return await getMarkdownDocument(path.join(directory, fileName));
        })
        .filter(Boolean)
    );
    return files as MarkdownDocument[];
  } catch (error) {
    console.log('getMarkdowns -> error', error.message);
    throw new Error(`Could not get content: ${error.message}`);
  }
}

export async function readMarkdownDocument(
  type: ContentType,
  fileName: string
): Promise<MarkdownDocument | undefined> {
  try {
    const directory = await getDirectoryPath(type);
    const markdownDocument = await getMarkdownDocument(
      path.join(directory, fileName)
    );
    return markdownDocument;
  } catch (error) {
    throw new Error('Cannot read document');
  }
}
