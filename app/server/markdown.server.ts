import path from "path";
import fs from "fs/promises";
import fm from "front-matter";
import {marked} from "marked";
import { POST_PATH, BLOG_PATH } from "~/constants";

export type Post = {
    slug: string;
    title: string;
    tags?: string[];
    preview?: string;
    content?: string;
};

export type PostMarkdownAttributes = {
    title: string;
    categories: string;
};

export type ContentType = "post" | "blog";

function getDirectory(type: ContentType): string {
  console.log('type', type)
  switch (type) {
    case "post":
      return POST_PATH;
    case "blog":
      return BLOG_PATH;
    default:
      throw new Error("Invalid type");
  }
}


const isValidMarkdownAttributes = (attributes: any): attributes is PostMarkdownAttributes => {
  return typeof attributes.title === "string";
}

export async function getAllMarkdownsFromDirectory(type: ContentType): Promise<Post[]> {
  const directory = path.join(process.cwd(), getDirectory(type));
  const files = await fs.readdir(directory);
  return Promise.all(files.map(async (fileName) => {
    const file = await fs.readFile(path.join(directory, fileName), "utf-8");

    // get the front matter
    const {attributes} = fm<Post>(file.toString())

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

export async function getMarkdownFromFile(type: ContentType, slug: string): Promise<Post> {
  console.log(type, slug)
  const directory = path.join(process.cwd(), getDirectory(type));
  const file = await fs.readFile(path.join(directory, `${slug}.md`), "utf-8");
  const { attributes, body } = fm<Post>(file.toString());

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

export const getPosts = async (): Promise<Post[]> => {
    const metadata = await getAllMarkdownsFromDirectory('post');
    return metadata;
}

export const getPost = async (slug: string): Promise<Post> => {
  const metadata = await getMarkdownFromFile('post', slug);
  return metadata;
}

export const getBlogs = async (): Promise<Post[]> => {
  const metadata = await getAllMarkdownsFromDirectory('blog');
  return metadata;
}

export const getBlog = async (slug: string): Promise<Post> => {
  const metadata = await getMarkdownFromFile('blog', slug);
  return metadata;
}
