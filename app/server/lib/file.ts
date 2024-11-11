import {
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData
} from '@remix-run/node';
import fs from 'fs/promises';
import path from 'path';
import {createName} from '~/server/lib/upload';

export const fileService = {
  save: async (directory: string, file: File) => {
    if (!file || file.size === 0) {
      return undefined;
    }

    const newName = createName(file.name);
    const filePath = path.join(directory, newName);
    const url = path.join(directory.replace(/(\/?)public/i, '/'), newName);
    await fs.mkdir(directory, {recursive: true});
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
    return {
      url,
      fileName: newName,
      filePath,
      directory
    };
  },
  saveAll: async (directory: string, files: File[]) => {
    const result = [];

    if (files instanceof File) {
      const image = await fileService.save(directory, files);
      if (image) {
        result.push(image);
      }
      return result;
    }

    if (files instanceof Array) {
      for (const file of files) {
        const saved = await fileService.save(directory, file);
        if (saved) {
          result.push(saved);
        }
      }
    }

    return result;
  },
  delete: async (path: string) => {
    try {
      await fs.unlink(path);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
  deleteAll: async (paths: string[]) => {
    if (paths instanceof Array) {
      return await Promise.all(
        paths.map(async (path) => await fileService.delete(path))
      );
    }

    return [await fileService.delete(paths)];
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

export default fileService;
