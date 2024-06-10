import path from 'path';
import fs from 'fs/promises';
import fm from 'front-matter';

export type MarkdownType = string;

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

/**
 * Read the frontmatter.json file
 * it reads frontmatter.frontMatter.content.pageFolders property
 * @returns
 * @example
 * returns [{title: 'post', path: 'app/markdown/portfolio'}, {title: 'blog', path: 'app/markdown/blog'}, {title: 'product', path: 'app/markdown/products'}]
 */
async function readFrontMatterConfig(): Promise<FMConfigPageFolders[]> {
  const directory = path.join(process.cwd(), 'frontmatter.json');

  // Read the frontmatter.json file
  const frontmatterContent = await fs.readFile(directory, 'utf8');

  // Parse the JSON content
  const frontmatter = JSON.parse(frontmatterContent);

  return frontmatter;
}

function getPageFolders(frontmatter: any): FMConfigPageFolders[] {
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

/**
 * Get the directory of the markdown files
 * @param type
 * @returns
 * @example
 * getPath('post') // returns 'app/markdown/portfolio'
 * getPath('blog') // returns 'app/markdown/blog'
 * getPath('product') // returns 'app/markdown/products'
 * getPath('invalid') // returns ''
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
export async function getPath(type: MarkdownType): Promise<string | null> {
  const config = await readFrontMatterConfig();
  const pageFolders = getPageFolders(config);
  const directory = pageFolders.find(
    (item: FMConfigPageFolders) => item.title === type
  );
  return directory?.path || null;
}

export const isValidMarkdownAttributes = (
  attributes: any
): attributes is FMAttributes => {
  console.log('isValidMarkdownAttributes');
  return typeof attributes.title === 'string';
};

export async function readMarkdownFile(
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

export async function getDocuments(
  type: MarkdownType
): Promise<MarkdownDocument[]> {
  try {
    const route = await getPath(type);

    if (!route) return [];

    const fileNames = await fs.readdir(route);
    const documents = await Promise.all(
      fileNames
        .map(async (fileName) => {
          return await readMarkdownFile(path.join(route, fileName));
        })
        .filter(Boolean)
    );
    return documents as MarkdownDocument[];
  } catch (error) {
    console.log('getDocuments -> error', error.message);
    throw new Error(`Could not get content: ${error.message}`);
  }
}

export async function getDocument(
  type: MarkdownType,
  fileName: string
): Promise<MarkdownDocument | null> {
  const directory = await getPath(type);
  if (!directory) {
    return null;
  }
  const markdownDocument = await readMarkdownFile(
    path.join(directory, fileName)
  );
  return markdownDocument;
}
