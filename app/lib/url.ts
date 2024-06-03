export type CharacterMap = {[key: string]: string};

// create a function that returns a slug from a title
export function slugify(title: string): string {
  const map: CharacterMap = {
    á: 'a',
    é: 'e',
    í: 'i',
    ó: 'o',
    ú: 'u',
    ñ: 'n'
  };

  let slug = title.toLowerCase().trim().replace(/\s/g, '-');

  for (let character in map) {
    let re = new RegExp(character, 'g');
    slug = slug.replace(re, map[character]);
  }

  return slug;
}

export function createPath(parentPath: string, localName: string) {
  if (parentPath) {
    return `${parentPath}/${slugify(localName)}`;
  } else {
    return slugify(localName);
  }
}
