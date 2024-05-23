import {FilePreview} from './InputFilePreview.types';

export function generatePreviewAttributes(files: FileList | null) {
  if (files) {
    return Array.from(files)
      .map((file) => {
        let filePreviewAttrs = {type: file.type, name: file.name, url: ''};
        if (file.type.match('image')) {
          filePreviewAttrs.url = URL.createObjectURL(file);
        }
        return filePreviewAttrs;
      })
      .filter((file) => file !== undefined) as FilePreview[];
  }
  return [];
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
    preview.find((file) => file.name === fileName)?.url || ''
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
