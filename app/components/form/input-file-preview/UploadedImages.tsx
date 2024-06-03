import { useField } from "remix-validated-form";
import { useState } from 'react';
import { atom, useAtom } from 'jotai';
import { Trash2 } from 'lucide-react';
import cx from 'clsx';

import { t } from '~/i18n/translate';
import { MapImage } from "~/types/global.type";

import { Button } from '~/components/ui/button';
import styles from "./InputFilePreview.module.css";
import InputFilePreview, { InputFilePreviewProps } from './InputFilePreview';

const DEFAULT_INPUT_NAME = 'toDelete';

interface UploadedImagesItem {
  source: MapImage,
  onDelete?: (isDeleteChecked: boolean, source: MapImage | undefined) => void;
  checked?: boolean;
}

const showUploadAtom = atom(false);

export function UploadedImagesItem({ source, onDelete, checked = false }: UploadedImagesItem) {
  const [isDeleteChecked, setDelete] = useState(checked)
  const field = useField(DEFAULT_INPUT_NAME);

  return (
    <div className={cx(styles.item, "box paper", { [styles.imageDisabled]: isDeleteChecked })}>
      <div>
        <input name={DEFAULT_INPUT_NAME} defaultChecked={isDeleteChecked} value={source.filePath} {...field.getInputProps({ type: "checkbox", value: source.filePath })} />
        <span style={{ display: "none" }}>
        </span>
        <img className={cx(styles.image, {
          [styles.imageDisabled]: isDeleteChecked
        })} src={source?.url} />
      </div>
      <div>
        <span className={cx(`${styles.badge} text-sm`, {
          'line-through': isDeleteChecked
        })}>{source?.fileName}</span>
      </div>
      <div>
        <Button
          aria-label="delete"
          type="button"
          variant={isDeleteChecked ? "default" : "destructive"}
          size='sm'
          onClick={(event) => {
            event.preventDefault();
            setDelete(!isDeleteChecked)
            onDelete?.(!isDeleteChecked, source)
          }}
        >
          <Trash2 className="h-5 w-5" />
          {isDeleteChecked ? "Restore" : t('GLOBAL.DELETE')}
        </Button>
      </div>
    </div>
  );
}

type UploadedImages = InputFilePreviewProps & {
  source: MapImage[] | MapImage | undefined;
  className?: string;
  multiple?: boolean;
  children?: React.ReactNode;
}

export default function UploadedImages({ className, source, multiple, ...props }: UploadedImages) {
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
  } else if (source) {
    imageComponent = (<UploadedImagesItem onDelete={(isChecked) => setDelete(isChecked)} source={source as MapImage} />)
  }

  return (
    <>
      <div className={cx(styles.previewList, className)}>
        {imageComponent}
      </div>
      {showUploadInput && <InputFilePreview type="file" multiple={multiple} {...props} />}
    </>
  )
}
