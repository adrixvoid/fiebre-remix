import cx from 'clsx';
import { CloudUpload, Trash2 } from 'lucide-react';

import { t } from '~/i18n/translate';
import useFilePreview from './useFilePreview';

import { Button } from '~/components/button/Button';
import { ErrorMessage } from '../ErrorMessage';
import ImageBlob from "./ImageBlob";
import { FilePreview } from './InputFilePreview.types';
import { PreviewList, PreviewListActions, PreviewListBadge, PreviewListItem } from './PreviewList';

import { useRef } from 'react';
import { Flex } from '~/components/flex/Flex';
import styles from "./InputFilePreview.module.css";

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
    let { inputElement, setInputElement, previewList, removePreview, saveBuffer, createPreview } = useFilePreview({ multiple });
    const inputRef = useRef<HTMLInputElement>(null);

    const injectedProps = {
        tabIndex: 0,
        id: String(id ? id : name),
        name,
        multiple,
        ...rest,
        onClick: (event: React.MouseEvent<HTMLInputElement>) => {
            if (!inputElement) {
                setInputElement(event.target as HTMLInputElement);
            }
            saveBuffer((event.target as HTMLInputElement).files);
            onClick?.(event);
        },
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!inputElement) {
                setInputElement(event.target as HTMLInputElement);
            }
            createPreview((event.target as HTMLInputElement).files);
            onChange?.(event);
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (!inputElement) {
                setInputElement(event.target as HTMLInputElement);
            }
            onKeyDown?.(event);
        },
        type: "file",
    }

    const handleDragOver = (event: React.DragEvent<HTMLInputElement | HTMLLabelElement>) => {
        event.preventDefault();
    }

    const handleDrop = (event: React.DragEvent<HTMLInputElement | HTMLLabelElement>) => {
        event.preventDefault();

        if (inputRef.current?.files) {
            setInputElement(inputRef.current);
            createPreview(event.dataTransfer.files);
            saveBuffer(event.dataTransfer.files);
        }

        if (event.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...event.dataTransfer.items].forEach((item, i) => {
                // If dropped items aren't files, reject them
                if (item.kind === "file") {
                    const file = item.getAsFile();
                }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...event.dataTransfer.files].forEach((file, i) => {
            });

            if (inputRef?.current?.files) {
                inputRef.current.files = event.dataTransfer.files;
            }
        }

        if (inputRef?.current?.files) {
            inputRef.current.files = event.dataTransfer.files;
        }
    }

    return (
        <>
            {(previewList.length > 0) &&
                <PreviewList className={styles.previewList}>
                    {previewList.map((file: FilePreview) => (
                        <PreviewListItem key={file.name}>
                            {file.type.match("image") && (
                                <span className="flex">
                                    <ImageBlob name={file.name} src={file.src} />
                                </span>
                            )}
                            <div>
                                <PreviewListBadge>{file.name}</PreviewListBadge>
                            </div>
                            <PreviewListActions>
                                <Button aria-label="delete" type="button" variant="destructive" size='sm' onClick={() => removePreview(file.name)}>
                                    <Trash2 strokeWidth={1.5} />
                                    {t('DELETE')}
                                </Button>
                            </PreviewListActions>
                        </PreviewListItem>
                    ))}
                </PreviewList>
            }
            <label role="button"
                className={cx(styles.label, { "mt-2": previewList.length > 0 })}
                htmlFor={injectedProps.id}
                {...labelProps}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <span style={{ overflow: 'hidden' }}>
                    <Flex direction='column' justify='center' align='center' gap="0">
                        <CloudUpload />
                        {label}
                        <span className={styles.smallText}>Click here or drag and drop the file you want to upload</span>
                    </Flex>
                    <span style={{ transform: "translateX(-100vw)", position: "absolute", left: "-100vw" }}>
                        <input ref={inputRef} {...injectedProps} />
                    </span>
                </span>
            </label>
            <ErrorMessage name={name} error={error} />
        </>
    );
}
