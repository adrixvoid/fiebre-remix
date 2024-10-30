import cx from 'clsx';
import { atom, useAtom } from 'jotai';
import { Trash2 } from 'lucide-react';

import { t } from '~/i18n/translate';
import { MapImage } from "~/types/file";

import { useEffect } from "react";
import { Button } from '~/components/ui/button/Button';
import styles from "./InputFilePreview.module.css";
import { PreviewList, PreviewListActions, PreviewListBadge, PreviewListImage, PreviewListItem } from './PreviewList';

const DELETE_INPUT_NAME = 'toDelete';

interface ImagePreviewProps {
  source: MapImage,
  onDelete?: (source: MapImage) => void;
  checked?: boolean;
}

export const deleteSetListAtom = atom(new Set<string>());
export const showUploadAtom = atom(false);

export function ImagePreview({ source, onDelete, checked = false }: ImagePreviewProps) {
  return (
    <PreviewListItem disabled={checked}>
      <div>
        <PreviewListImage disabled={checked} src={source?.url} />
      </div>
      <div>
        <PreviewListBadge>{source?.fileName}</PreviewListBadge>
      </div>
      <PreviewListActions>
        <Button
          aria-label="delete"
          type="button"
          variant={checked ? "default" : "destructive"}
          size='sm'
          onClick={(event) => {
            event.preventDefault();
            onDelete?.(source)
          }}
        >
          <Trash2 />
          {checked ? "Restore" : t('DELETE')}
        </Button>
      </PreviewListActions>
    </PreviewListItem>
  );
}

type InputImageListProps = React.InputHTMLAttributes<HTMLInputElement> & {
  source: MapImage[] | MapImage | undefined;
  className?: string;
  children?: React.ReactNode;
  multiple?: boolean;
}

export function InputImageList({ className, source, multiple, ...rest }: InputImageListProps) {
  const [deleteSetList, setDeleteList] = useAtom(deleteSetListAtom)
  const [showUploadFile, setShowUploadFile] = useAtom(showUploadAtom)

  useEffect(() => {
    if (multiple || !source) {
      setShowUploadFile(true);
    }
  }, [])

  let imageComponent = null;

  const handleOnDelete = (source: MapImage) => {
    if (deleteSetList.has(source.filePath)) {
      deleteSetList.delete(source.filePath)
    } else {
      deleteSetList.add(source.filePath)
    }
    setDeleteList(new Set(deleteSetList))
  }

  if (source instanceof Array) {
    imageComponent = (
      <PreviewList>
        {(source as MapImage[])?.map((sourceItem) => (
          <ImagePreview key={sourceItem.fileName} source={sourceItem} onDelete={handleOnDelete} checked={deleteSetList.has(sourceItem.filePath)} />
        ))}
      </PreviewList>
    );
  } else if (source) {
    imageComponent = (<ImagePreview source={source as MapImage} checked={deleteSetList.has(source.filePath)}
      onDelete={(source: MapImage) => { setShowUploadFile(!deleteSetList.has(source.filePath)); handleOnDelete(source); }} />)
  }

  return (
    <>
      <div className={cx(styles.previewList, className)}>
        {imageComponent}
      </div>
      <span style={{ display: "none" }}>
        {Array.from(deleteSetList).map((d) => (
          <input key={d} type='checkbox' name={DELETE_INPUT_NAME} checked={true} onChange={() => { }} value={d} {...rest} />
        ))}
      </span>
    </>
  )
}

export default InputImageList;
