import { Slot } from "@radix-ui/react-slot"
import { atom, useAtom } from 'jotai';
import { Trash2 } from 'lucide-react';
import cx from 'clsx';

import { t } from '~/i18n/translate';
import { MapImage } from "~/types/global.type";

import { Button } from '~/components/button/Button';
import styles from "./InputFilePreview.module.css";
import Input from "../Input";
import { useEffect } from "react";

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
    <div className={cx(styles.item, "box paper", { [styles.imageDisabled]: checked })}>
      <div>
        <img className={cx(styles.image, {
          [styles.imageDisabled]: checked
        })} src={source?.url} />
      </div>
      <div>
        <span className={cx(`${styles.badge} text-sm`, {
          'line-through': checked
        })}>{source?.fileName}</span>
      </div>
      <div>
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
          {checked ? "Restore" : t('GLOBAL.DELETE')}
        </Button>
      </div>
    </div>
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

  console.log("source", source)

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
      <ul>
        {(source as MapImage[])?.map((sourceItem) => (
          <li key={sourceItem.fileName}>
            <ImagePreview source={sourceItem} onDelete={handleOnDelete} checked={deleteSetList.has(sourceItem.filePath)} />
          </li>
        ))}
      </ul>
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
