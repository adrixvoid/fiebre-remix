import {useState, useCallback} from 'react';
import {atom, useAtom} from 'jotai';
import {FilePreview} from './InputFilePreview.types';
import {
  filterFileList,
  findRevokeObjectURL,
  toFilePreview,
  mergeFiles
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
    (inputElement: HTMLInputElement) => {
      const files = inputElement.files;
      if (multiple) {
        if (fileBuffer && fileBuffer.length > 0) {
          inputElement.files = mergeFiles(fileBuffer, files);
          setFileBuffer(null);
        }
      }

      const newPreview = toFilePreview(inputElement.files);
      setPreviewList(newPreview);

      return newPreview;
    },
    [previewList, fileBuffer]
  );

  const onSaveBuffer = (
    event:
      | React.MouseEvent<HTMLInputElement, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    setInputElement(event.target as HTMLInputElement);
    saveBuffer((event.target as HTMLInputElement).files);
  };

  const onCreatePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputElement(event.target as HTMLInputElement);
    createPreview(event.target as HTMLInputElement);
  };

  return {
    setInputElement,
    previewList,
    removePreview,
    createPreview,
    saveBuffer,
    onSaveBuffer,
    onCreatePreview
  };
}

export default useFilePreview;
