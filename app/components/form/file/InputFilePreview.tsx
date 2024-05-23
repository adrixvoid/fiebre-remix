import cx from 'classnames';

import useFilePreview, { FilePreview } from './useFilePreview'
import Image from "~/components/Image";
import styles from "./InputFilePreview.module.css";
import Button from '~/components/button/Button';

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

export function PreviewList({ preview, onRemove }: {
    onRemove: (fileName: string) => void,
    preview: FilePreview[]
}) {
    if (preview.length > 0) {
        return (
            <ul className={styles.previewList}>
                {preview.map((file: FilePreview) => (
                    <li key={file.name} className={cx(styles.item, "box")}>
                        {file.type.match("image") && (
                            <span className="block">
                                <Image className={styles.image} name={file.name} url={file.url} />
                            </span>
                        )}
                        <div>
                            <span className={`${styles.badge} text-small`}>{file.name}</span>
                        </div>
                        <Button type="button" color="danger" onClick={() => onRemove(file.name)}>Delete</Button>
                    </li>
                ))}
            </ul>
        );
    }

    return null;
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
    let { preview, removePreview, onClickHandler, onChangeHandler, onKeyDownHandler } = useFilePreview({ multiple });

    const injectedProps = {
        tabIndex: 0,
        id: String(id ? id : name),
        name,
        multiple,
        ...rest,
        onClick: (event: React.MouseEvent<HTMLInputElement>) => {
            onClickHandler(event)
            onClick?.(event);
        },
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            onChangeHandler(event)
            onChange?.(event);
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
            onKeyDownHandler(event)
            onKeyDown?.(event);
        },
        type: "file",
    }

    return (
        <>
            <PreviewList onRemove={removePreview} preview={preview} />
            <label role="button"
                className={cx(styles.label, { "mt-1": preview.length > 0 })}
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
            {Boolean(error) && <p className="box color-danger">{error}</p>}
        </>
    );
}
