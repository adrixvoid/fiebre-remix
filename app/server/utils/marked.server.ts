import {marked} from "marked";

// Create a new renderer
const renderer = new marked.Renderer();

// Override the image method
renderer.image = function(href, title, text) {
  let template = '';
  template += `<figure class="markdown-figure" aria-hidden>`;
  template += `<img src="${href}" alt="${text}" class="markdown-image" />`;
  if (title) {
    template += `<figcaption class="markdown-figcaption">${title}</figcaption>`;
  }
  template += `</figure>`;
  return template;
};

// Override the paragraph method
renderer.paragraph = function(text) {
  // If the text is an image, return it without wrapping in <p> tags
  if (text.startsWith('<img')) {
      return text;
  }

  // Otherwise, wrap the text in <p> tags as usual
  return `<p>${text}</p>`;
};

// Set the options to use the custom renderer
marked.setOptions({ renderer });

/**
 * Parse the markdown file
 * @param body
 * @returns string
 */
export const parse = async (body: string): Promise<string> => {
  try {
    return await marked(body);
  } catch (error) {
    throw new Error("Cannot parse markdown file");
  }
}