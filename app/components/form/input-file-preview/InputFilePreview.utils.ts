import {FilePreview} from './InputFilePreview.types';

export function toFilePreview(files: FileList | null): FilePreview[] {
  if (!files) return [];

  return Array.from(files)
    .filter((file) => file.type.match('image'))
    .map((file) => ({
      type: file.type,
      name: file.name,
      src: URL.createObjectURL(file)
    }))
    .filter((file) => file !== undefined) as FilePreview[];
}

export function filterFileList(
  files: FileList | null,
  cb: (file: File) => File | undefined
) {
  if (files) {
    const dT = new DataTransfer();
    Array.from(files).forEach((file) => {
      const cbResult = cb(file);
      if (cbResult) {
        dT.items.add(cbResult);
      }
    });
    return dT.files;
  }
  return null;
}

export function mergeFiles(
  originalFileList: FileList | null,
  newFileList: FileList | null
) {
  if (!originalFileList) {
    return newFileList;
  }

  if (!newFileList) {
    return originalFileList;
  }

  const dT = new DataTransfer();
  Array.from(originalFileList).forEach((file) => {
    dT.items.add(file);
  });
  Array.from(newFileList).forEach((file) => {
    dT.items.add(file);
  });

  return dT.files;
}

export function cloneFileList(files: FileList | null) {
  if (files) {
    const dT = new DataTransfer();
    Array.from(files).forEach((file) => {
      dT.items.add(file);
    });
    return dT.files;
  }
  return null;
}

export const findRevokeObjectURL = (preview: FilePreview[], fileName: string) =>
  URL.revokeObjectURL(
    preview.find((file) => file.name === fileName)?.src || ''
  );

export const preventDuplicates = (
  preview: FilePreview[],
  newPreview: FilePreview[]
) =>
  newPreview.filter((file) => {
    return !preview.some(
      (prevFile: FilePreview) => prevFile.name === file.name
    );
  });

export const mergePreview = (
  preview: FilePreview[],
  newPreview: FilePreview[]
) => {
  // prevent duplicates in preview
  const filteredPreview = preventDuplicates(preview, newPreview);
  return [...preview, ...filteredPreview];
};
