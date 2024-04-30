import {useState, useRef, useCallback} from 'react';
import type {FilePreview} from './InputFilePreview.type';
import {atom, useAtom} from 'jotai';

const buffer = atom<FileList | null>(null);

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

export const removePreview = (preview: FilePreview[], fileName: string) =>
  preview?.filter((file: FilePreview) => file.name !== fileName);

export const removeFromObjectURL = (preview: FilePreview[], fileName: string) =>
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

function useFilePreview({multiple = false}) {
  const [preview, setPreview] = useState<FilePreview[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileBuffer, setFileBuffer] = useAtom(buffer);

  const saveBuffer = () => {
    if (
      multiple &&
      inputRef?.current?.files &&
      inputRef.current.files.length > 0
    ) {
      setFileBuffer(inputRef.current?.files);
    }
  };

  const cleanBuffer = () => {
    setFileBuffer(null);
  };

  const removeFile = useCallback(
    (fileName: string) => {
      const inputCurrent = inputRef.current;

      if (!inputCurrent || !inputCurrent?.files) {
        return;
      }

      removeFromObjectURL(preview, fileName);

      const filteredList = filterFileList(inputCurrent.files, (file: File) => {
        if (file.name !== fileName) {
          return file;
        }
      });

      if (filteredList && filteredList.length > 0) {
        inputCurrent.files = filteredList;
      }

      const newPreview = removePreview(preview, fileName);
      setPreview(newPreview);
      return newPreview;
    },
    [inputRef?.current?.files, preview]
  );

  const createPreview = useCallback(() => {
    const inputCurrent = inputRef.current as HTMLInputElement;

    if (multiple) {
      if (fileBuffer && fileBuffer.length > 0) {
        inputCurrent.files = mergeFiles(fileBuffer, inputCurrent.files);
        cleanBuffer();
      }
    }

    const newPreview = generatePreviewAttributes(inputCurrent.files);
    setPreview(newPreview);

    return newPreview;
  }, [preview, fileBuffer]);

  return {
    inputRef,
    preview,
    removeFile,
    createPreview,
    saveBuffer,
    cleanBuffer
  };
}

export default useFilePreview;
