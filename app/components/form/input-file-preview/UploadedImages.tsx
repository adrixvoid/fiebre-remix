import cx from 'classnames';
import { MapImage } from "~/types/global.type";
import { IconButton } from '~/components/button/Button';
import { useState } from 'react';
import styles from "~/components/form/input-file-preview/InputFilePreview.module.css";
import { IconTrash } from '~/components/svg';
import { atom, useAtom } from 'jotai';

const DEFAULT_INPUT_NAME = 'toDelete';

interface UploadedImagesItem {
  source: MapImage,
  onDelete?: (isDeleteChecked: boolean, source: MapImage | undefined) => void;
  checked?: boolean;
}

const showUploadAtom = atom(false);

export function UploadedImagesItem({ source, onDelete, checked = false }: UploadedImagesItem) {
  const [isDeleteChecked, setDelete] = useState(checked)
  return (
    <div className={cx(styles.item, "box paper", { [styles.imageDisabled]: isDeleteChecked })}>
      <div>
        <span style={{ display: "none" }}>
          <input type="checkbox" name={DEFAULT_INPUT_NAME} value={source.filePath} defaultChecked={isDeleteChecked} />
        </span>
        <img className={cx(styles.image, {
          [styles.imageDisabled]: isDeleteChecked
        })} src={source.url} />
      </div>
      <div>
        <span className={cx(`${styles.badge} text-sm`, {
          'line-through': isDeleteChecked
        })}>{source.fileName}</span>
      </div>
      <div>
        <IconButton
          onClick={(event) => {
            event.preventDefault();
            setDelete(!isDeleteChecked)
            onDelete?.(!isDeleteChecked, source)
          }}
          aria-label="delete"
          size='sm'
          color={isDeleteChecked ? "primary" : "danger"}
          icon={<IconTrash />}
        >
          {isDeleteChecked ? "Restore" : "Delete"}
        </IconButton>
      </div>
    </div>
  );
}

type UploadedImages = {
  source: MapImage[] | MapImage | undefined;
  className: string;
  multiple?: boolean;
  children?: React.ReactNode;
}

export default function UploadedImages({ className, source, multiple, children }: UploadedImages) {
  const [isDeleteChecked, setDelete] = useAtom(showUploadAtom)
  const showUploadInput = (multiple || isDeleteChecked || !source);
  let imageComponent = null;

  if (source instanceof Array) {
    imageComponent = (
      <>
        <ul>
          {(source as MapImage[])?.map((file) => (
            <li key={file.fileName}>
              <UploadedImagesItem source={file} />
            </li>
          ))}
        </ul>
      </>
    );
  }

  if (source) {
    imageComponent = (<UploadedImagesItem onDelete={(isChecked) => setDelete(isChecked)} source={source as MapImage} />)
  }

  return (
    <>
      <div className={cx(styles.previewList, className)}>
        {imageComponent}
      </div>
      {showUploadInput && children}
    </>
  )
}
