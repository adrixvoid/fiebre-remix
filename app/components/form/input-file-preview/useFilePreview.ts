import {atom, useAtom} from 'jotai';
import {useCallback, useState} from 'react';
import {FilePreview} from './InputFilePreview.types';
import {
  filterFileList,
  findRevokeObjectURL,
  mergeFiles,
  toFilePreviewType
} from './InputFilePreview.utils';

const buffer = atom<FileList | null>(null);
const inputAtom = atom<HTMLInputElement | null>(null);

function useFilePreview({multiple = false}) {
  const [previewList, setPreviewList] = useState<FilePreview[]>([]);
  const [fileBuffer, setFileBuffer] = useAtom(buffer);
  const [inputElement, setInputElement] = useAtom(inputAtom);

  const saveBuffer = (files: FileList | null) => {
    if (multiple && files && files.length > 0) {
      setFileBuffer(files);
    }
  };

  const removePreview = useCallback(
    (fileName: string) => {
      if (!inputElement) {
        return;
      }

      findRevokeObjectURL(previewList, fileName);

      inputElement.files = filterFileList(inputElement.files, (file: File) =>
        file.name !== fileName ? file : undefined
      );
      setPreviewList(
        previewList?.filter((file: FilePreview) => file.name !== fileName)
      );
    },
    [inputElement, previewList]
  );

  const createPreview = useCallback(
    (files: FileList | null) => {
      if (multiple) {
        if (fileBuffer && fileBuffer.length > 0) {
          files = mergeFiles(fileBuffer, files);
          setFileBuffer(null);
        }
      }

      const filePreviewList = toFilePreviewType(files);
      setPreviewList(filePreviewList);

      return filePreviewList;
    },
    [previewList, fileBuffer]
  );

  return {
    inputElement,
    setInputElement,
    previewList,
    removePreview,
    createPreview,
    saveBuffer
  };
}

export default useFilePreview;
