import fs from 'fs/promises';
import path from 'path';
import {
  unstable_parseMultipartFormData,
  unstable_createFileUploadHandler
} from '@remix-run/node';
import {createName} from '../utils/upload';

export const uploadService = {
  saveFile: async (directory: string, file: File) => {
    if (file.size === 0) {
      return undefined;
    }

    const newName = createName(file.name);
    const filePath = path.join(directory, newName);
    const url = path.join(directory.replace(/(\/?)public/i, '/'), newName);
    console.log('new URL', url);
    await fs.mkdir(directory, {recursive: true});
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
    return {
      url,
      fileName: newName,
      filePath,
      directory
    };
  },
  saveFiles: async (directory: string, files: File[]) => {
    const result = [];

    if (files instanceof File) {
      const image = await uploadService.saveFile(directory, files);
      result.push(image);
      return result;
    }

    if (files instanceof Array) {
      for (const file of files) {
        const saved = await uploadService.saveFile(directory, file);
        result.push(saved);
      }
    }

    return result;
  }
};

export async function deprecated_uploadFilesAction(
  request: Request,
  options?: {relativePath: string}
): Promise<FormData | null> {
  try {
    const uploadHandler = unstable_createFileUploadHandler({
      maxPartSize: 10_000_000,
      directory: path.join(
        process.cwd(),
        'public',
        options?.relativePath || ''
      ),
      file: ({filename}) => createName(filename),
      filter: ({contentType}) => contentType.includes('image')
    });

    return await unstable_parseMultipartFormData(request, uploadHandler);
  } catch (error) {
    console.error(error.message);
    return null;
  }
}
