import {NodeOnDiskFile} from '@remix-run/node';
import path from 'path';
import {ASSET_PATH} from '~/constants';
import {MapFile} from '~/types/file';

export type AssetPathKey = keyof typeof ASSET_PATH;
export type FileType = 'image' | 'video' | 'audio' | 'files' | string;

export function shortenName(name: string) {
  return name.length > 10 ? name.slice(10) : name;
}

/**
 * On this version, I used the new Date().toISOString() function to get the current date and time in ISO format,
 * Then, I used the path.parse() function to get the name and extension of the file.
 * Finally, I used the String.concat() function to concatenate the timestamp, the name of the file and its extension.
 * With this configuration, when you upload a file, it will be renamed using the format you specified
 * (for example, "20231103214715_name-of-the-file.jpg").
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
 * @param {string} oldName
 * @returns {string}
 */
export function createName(fileName: string): string {
  const shortName = shortenName(path.parse(fileName).name);
  const extension = path.extname(fileName);
  return `${crypto.randomUUID()}-${shortName}${extension}`;
}

export function getFolderType(fileType: FileType): string {
  const type = fileType.split('/')[0];
  switch (type) {
    case 'image':
      return 'images';
    case 'video':
      return 'videos';
    case 'audio':
      return 'audios';
    default:
      return 'files';
  }
}

export const removePublicPath = (filePath: string) => {
  return filePath?.split('public')[1];
};

export const prepareFileDataForDB = (file: NodeOnDiskFile): MapFile => {
  const relativePath = removePublicPath(file?.getFilePath());
  return {
    url: file?.getFilePath()?.replace('public/', ''),
    fileName: file.name,
    directory: relativePath,
    filePath: file?.getFilePath()
  };
};
