import {marked, RendererObject} from 'marked';

// Crear un render personalizado
const renderer: RendererObject | null | undefined = {
  listitem({type, raw, task, checked, loose, text, tokens}) {
    // Buscar si el texto del elemento empieza con un emoji y un espacio
    const emojiMatch = text.match(
      /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s/u
    );

    if (emojiMatch) {
      const emoji = emojiMatch[0].trim();
      text = text.replace(emojiMatch[0], '').trim(); // Eliminar el emoji del contenido

      // Insertar el emojiSpan al principio del <li>
      text = `<li class="custom-list-style" style="list-style:none;">${emoji} ${text}</li>`;
    }

    return text;
  },
  image({href, title, text}) {
    return `<img src="${href}" aria-hidden />`;
  }
};

/**
 * Parse the markdown file
 * @param body
 * @returns string
 */
export const parse = async (body: string): Promise<string> => {
  marked.use({renderer, breaks: false});
  return marked.parse(body);
};

export function formatImage(url: string, name: string): string {
  return `![${name}](${url})`;
}
