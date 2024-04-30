import {
  unstable_parseMultipartFormData,
  unstable_createFileUploadHandler,
  NodeOnDiskFile
} from '@remix-run/node';
import path from 'path';
import {ASSET_PATH} from '~/constants';

export type AssetPathKey = keyof typeof ASSET_PATH;
export type FileType = 'image' | 'video' | 'audio' | 'files' | string;
export type MapFile = {
  name: string;
  url: string;
};

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
function generateNewFilename(originalName: string): string {
  try {
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
    const parsedName = path.parse(originalName).name.slice(0, 10);
    const extension = path.extname(originalName);

    if (!timestamp || !parsedName || !extension) {
      new Error('Unknown file');
    }

    return `${timestamp}_${parsedName}${extension}`;
  } catch (error) {
    return originalName;
  }
}

function getFolderType(fileType: FileType): string {
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

const extractRelativePath = (filePath: string) => {
  return filePath?.split('public')[1];
};

export const mapFile = (file: NodeOnDiskFile): MapFile => {
  const relativePath = extractRelativePath(file?.getFilePath());
  return {
    name: file.name,
    url: relativePath
  };
};

export async function uploadFilesAction(
  request: Request,
  options?: {relativePath: string}
): Promise<FormData> {
  console.log('request', request);
  const uploadHandler = unstable_createFileUploadHandler({
    maxPartSize: 10_000_000,
    directory: ({contentType}) =>
      path.join(
        process.cwd(),
        'public',
        options?.relativePath || 'content',
        getFolderType(contentType)
      ),
    file: ({filename}) => generateNewFilename(filename),
    filter: ({contentType}) => contentType.includes('image')
  });

  return await unstable_parseMultipartFormData(request, uploadHandler);
}
