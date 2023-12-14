import path from "path";
import fs from "fs/promises";
import fm from "front-matter";
import {marked} from "marked";

export type MarkdownDocument = {
    slug: string;
    title: string;
    tags?: string[];
    preview?: string;
    body?: string;
};

export type PostMarkdownAttributes = {
    title: string;
    categories: string;
};

export type ContentType = "posts" | "blog" | "products" | "pages";
export type PageFolders = {
  title: string;
  path: string;
}

/**
 * Read the frontmatter.json file
 * @returns
 * @example
 * readPageFoldersConfig() // returns [{title: 'post', path: 'app/content/posts'}, {title: 'blog', path: 'app/content/blog'}, {title: 'product', path: 'app/content/products'}]
 * 
 * const directory = path.join(process.cwd(), 'frontmatter.json');
 * const frontmatterContent = await fs.readFile(directory, 'utf8');
 * const frontmatter = JSON.parse(frontmatterContent);
 * const pageFolders = frontmatter.frontMatter.content.pageFolders;
 * return pageFolders;
 */
async function readPageFoldersConfig(): Promise<PageFolders[]> {
  const directory = path.join(process.cwd(), 'frontmatter.json');
  console.log('directory', directory)

  // Read the frontmatter.json file
  const frontmatterContent = await fs.readFile(directory, 'utf8');

  // Parse the JSON content
  const frontmatter = JSON.parse(frontmatterContent);

  console.log('frontmatter', frontmatter)

  // Access the frontMatter.content.pageFolders property
  const pageFolders = frontmatter['frontMatter.content.pageFolders'];

  return pageFolders.map((item: PageFolders) => {
    if (!item.title || !item.path) {
      throw new Error("Invalid frontmatter");
    }

    // replace the [[workspace]] with the current workspace directory
    let itemPath = item.path.replace('[[workspace]]', process.cwd());

    console.log("itemPath", itemPath)

    return {
      title: item.title,
      path: itemPath
    };
  })
}

/**
 * Get the directory of the markdown files
 * @param type
 * @returns
 * @example
 * getDirectory('post') // returns 'app/content/posts'
 * getDirectory('blog') // returns 'app/content/blog'
 * getDirectory('product') // returns 'app/content/products'
 * getDirectory('invalid') // returns ''
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
async function getDirectory(type: ContentType): Promise<string> {
  try {
    const pageFolders = await readPageFoldersConfig();
    const pageFolder = pageFolders.find((item: PageFolders) => item.title === type);

    if (!pageFolder) {
      throw new Error("Invalid type");
    }

    return pageFolder.path;
  } catch (error) {
    console.log('error', error)
    throw new Error("Invalid type");
  }
}


const isValidMarkdownAttributes = (attributes: any): attributes is PostMarkdownAttributes => {
  return typeof attributes.title === "string";
}

export async function getAllMarkdownsFromDirectory(type: ContentType): Promise<MarkdownDocument[]> {
  const directory = await getDirectory(type);
  const files = await fs.readdir(directory);
  return Promise.all(files.map(async (fileName) => {
    const file = await fs.readFile(path.join(directory, fileName), "utf-8");

    // get the front matter
    const {attributes} = fm<MarkdownDocument>(file.toString())

    if (!isValidMarkdownAttributes(attributes)) {
        throw new Error("Invalid attributes");
    }

    const metadata = {
      slug: fileName.replace(".md", ""),
      title: attributes.title,
      categories: attributes.categories,
      preview: attributes.preview,
    };

    return metadata;
  }));
}

export async function getMarkdownFromFile(type: ContentType, slug: string): Promise<{attributes: object, body: string}> {
  try {
    const directory = await getDirectory(type);

    console.log("directory", directory)
    const file = await fs.readFile(path.join(directory, `${slug}.md`), "utf-8");
    return fm<MarkdownDocument>(file.toString());
  } catch (error) {
    console.log('error', error)
    throw new Error("Invalid file");
  }
}

export const getPost = async (slug: string): Promise<MarkdownDocument> => {
  const {attributes, body} = await getMarkdownFromFile('posts', slug);

  if (!isValidMarkdownAttributes(attributes)) {
    throw new Error("Invalid attributes");
  }

  const metadata = {
    slug: slug,
    title: attributes.title,
    content: await marked(body) || '',
  };

  return metadata;
}

export const getBlog = async (slug: string): Promise<MarkdownDocument> => {
  const {attributes, body} = await getMarkdownFromFile('blog', slug);

  if (!isValidMarkdownAttributes(attributes)) {
    throw new Error("Invalid attributes");
  }

  const metadata = {
    slug: slug,
    title: attributes.title,
    content: await marked(body) || '',
  };

  return metadata;
}

export const getContent = async (type: ContentType, slug: string): Promise<MarkdownDocument> => {
  try {
    const {attributes, body} = await getMarkdownFromFile(type, slug);

    if (!isValidMarkdownAttributes(attributes)) {
      throw new Error("Invalid attributes");
    }

    return {
      slug: slug,
      title: attributes.title,
      body: await marked(body) || '',
    };
  } catch (error) {
    console.log('error', error)
    throw new Error("Invalid file");
  }
}


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