import {readMarkdownDocument} from "./utils/front-matter.server";
import {parse} from "./utils/marked.server";
import type {MarkdownDocument, ContentType} from "./utils/front-matter.server";

export const getContent = async (type: ContentType, slug: string): Promise<MarkdownDocument> => {
  const file = await readMarkdownDocument(type, `${slug}.md`);
  if (file.body) {
    file.body = await parse(file.body);
  }
  return file;
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