import {marked} from 'marked';

// Create a new renderer
const renderer = new marked.Renderer();

// Override the image method
renderer.image = function (href, title, text) {
  // let template = '';
  // template += `<figure class="markdown-figure" aria-hidden>`;
  // template += `<img src="${href}" alt="${text}" class="markdown-image" />`;
  // if (title) {
  //   template += `<figcaption class="markdown-figcaption">${title}</figcaption>`;
  // }
  // template += `</figure>`;
  // return template;
  return `<img src="${href}" aria-hidden />`;
};

// Override the paragraph method
renderer.paragraph = function (text) {
  if (text.length > 0 && !text.match(/^\<\w+/)) {
    return `<p>${text}</p>`;
  }

  return text;
};

// Set the options to use the custom renderer
marked.setOptions({renderer, breaks: false});

/**
 * Parse the markdown file
 * @param body
 * @returns string
 */
export const parse = async (body: string): Promise<string> => {
  try {
    return await marked(body);
  } catch (error) {
    throw new Error('Cannot parse markdown file');
  }
};

// ${images?.map((image) => formatImage(image.url, image.name)).join('\n')}
export function formatImage(url: string, name: string): string {
  return `![${name}](${url})`;
}
