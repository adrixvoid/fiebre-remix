import { Trash2 } from 'lucide-react';
import cx from 'clsx';

import { t } from '~/i18n/translate';
import { Button } from '~/components/button/Button';

import useFilePreview from './useFilePreview'
import { FilePreview } from './InputFilePreview.types';
import styles from "./InputFilePreview.module.css";
import ImageBlob from "./ImageBlob";

type ComponentType<T> =
    | React.JSXElementConstructor<T>
    | keyof JSX.IntrinsicElements
    | React.ReactElement;

export interface InputFilePreviewProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
    error?: string;
    component?: ComponentType<any>;
}

export default function InputFilePreview({
    id = "file",
    name = "file",
    label = "Select file...",
    multiple = false,
    labelProps,
    error,
    onClick,
    onChange,
    onKeyDown,
    ...rest
}: InputFilePreviewProps) {
    let { previewList, removePreview, onSaveBuffer, onCreatePreview } = useFilePreview({ multiple });

    const injectedProps = {
        tabIndex: 0,
        id: String(id ? id : name),
        name,
        multiple,
        ...rest,
        onClick: (event: React.MouseEvent<HTMLInputElement>) => {
            onSaveBuffer(event)
            onClick?.(event);
        },
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            onCreatePreview(event)
            onChange?.(event);
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
            onSaveBuffer(event)
            onKeyDown?.(event);
        },
        type: "file",
    }

    return (
        <>
            {(previewList.length > 0) &&
                <ul className={styles.previewList}>
                    {previewList.map((file: FilePreview) => (
                        <li key={file.name} className={cx(styles.item, "box paper")}>
                            {file.type.match("image") && (
                                <span className="flex">
                                    <ImageBlob className={styles.image} name={file.name} src={file.src} />
                                </span>
                            )}
                            <div>
                                <span className={`${styles.badge} text-sm`}>{file.name}</span>
                            </div>
                            <Button aria-label="delete" type="button" variant="destructive" size='sm' onClick={() => removePreview(file.name)}>
                                <Trash2 strokeWidth={1.5} />
                                {t('GLOBAL.DELETE')}
                            </Button>
                        </li>
                    ))}
                </ul>
            }
            <label role="button"
                className={cx(styles.label, { "mt-2": previewList.length > 0 })}
                htmlFor={injectedProps.id}
                {...labelProps}
            >
                <span>
                    {label}
                    <span style={{ transform: "translateX(-100vw)", position: "absolute", left: "-100vw" }}>
                        <input {...injectedProps} />
                    </span>
                </span>
            </label>
            {Boolean(error) && <p className="box paper color-danger">{error}</p>}
        </>
    );
}
