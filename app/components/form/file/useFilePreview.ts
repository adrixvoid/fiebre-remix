import {useState, useCallback} from 'react';
import {atom, useAtom} from 'jotai';
import {FilePreview} from './InputFilePreview.types';
import {
  filterFileList,
  findRevokeObjectURL,
  generatePreviewAttributes,
  mergeFiles
} from './InputFilePreview.utils';

const buffer = atom<FileList | null>(null);
const inputAtom = atom<HTMLInputElement | null>(null);

function useFilePreview({multiple = false}) {
  const [preview, setPreview] = useState<FilePreview[]>([]);
  const [fileBuffer, setFileBuffer] = useAtom(buffer);
  const [inputCurrent, setInputCurrent] = useAtom(inputAtom);

  const saveBuffer = (files: FileList | null) => {
    if (multiple && files && files.length > 0) {
      setFileBuffer(files);
    }
  };

  const removePreview = useCallback(
    (fileName: string) => {
      if (!inputCurrent) {
        return;
      }

      findRevokeObjectURL(preview, fileName);

      inputCurrent.files = filterFileList(inputCurrent.files, (file: File) =>
        file.name !== fileName ? file : undefined
      );

      const newPreview = preview?.filter(
        (file: FilePreview) => file.name !== fileName
      );
      setPreview(newPreview);
      return newPreview;
    },
    [inputCurrent, preview]
  );

  const createPreview = useCallback(
    (inputCurrent: HTMLInputElement) => {
      const files = inputCurrent.files;
      if (multiple) {
        if (fileBuffer && fileBuffer.length > 0) {
          inputCurrent.files = mergeFiles(fileBuffer, files);
          setFileBuffer(null);
        }
      }

      const newPreview = generatePreviewAttributes(inputCurrent.files);
      setPreview(newPreview);

      return newPreview;
    },
    [preview, fileBuffer]
  );

  const onClickHandler = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    setInputCurrent(event.target as HTMLInputElement);
    saveBuffer((event.target as HTMLInputElement).files);
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputCurrent(event.target as HTMLInputElement);
    createPreview(event.target as HTMLInputElement);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setInputCurrent(target);
    saveBuffer(target.files);
  };

  return {
    preview,
    removePreview,
    createPreview,
    saveBuffer,
    onClickHandler,
    onChangeHandler,
    onKeyDownHandler
  };
}

export default useFilePreview;
