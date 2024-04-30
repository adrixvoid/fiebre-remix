import cx from 'classnames';

import useFilePreview from './useFilePreview'
import type { FilePreview, UploadFileProps } from './InputFilePreview.type';
import Image from "~/components/Image";
import styles from "./InputFilePreview.module.css";
import Button from '~/components/button/Button';

export default function InputFilePreview({ id = "file", name = "file", labelText = "Select file...", multiple = false, labelProps, onPreview, ...rest }: UploadFileProps) {
    let { inputRef, preview, removeFile, createPreview, saveBuffer } = useFilePreview({ multiple });

    const handleOnChange = () => {
        const preview = createPreview()
        onPreview?.(preview)
    }

    const handleOnRemove = (fileName: string) => {
        const preview = removeFile(fileName)
        onPreview?.(preview || [])
    }

    return (
        <fieldset className={`${styles.fieldset} m-0`}>
            {
                preview.length > 0 &&
                <ul className={cx(styles.preview, { [styles.previewMultiple]: multiple })}>
                    {preview.map((file: FilePreview) => (
                        <li key={file.name} className={cx(styles.item, "box", { [styles.itemMultiple]: multiple })}>
                            {file.type.match("image") && (
                                <span className="block">
                                    <Image className={styles.image} name={file.name} url={file.url} />
                                </span>
                            )}
                            <div>
                                <span className={`${styles.badge} text-small`}>{file.name}</span>
                            </div>
                            <Button type="button" color="danger" onClick={() => handleOnRemove(file.name)}>Delete</Button>
                        </li>
                    ))}
                </ul>
            }
            <label role="button" className="block" htmlFor={id} {...labelProps} tabIndex={0} onKeyDown={saveBuffer}>
                {(preview.length === 0 || multiple) &&
                    <span className={styles.uploadArea}>{labelText}</span>
                }
                <input
                    ref={inputRef}
                    tabIndex={0}
                    id={id}
                    name={name}
                    multiple={multiple}
                    type="file"
                    style={{ transform: "translateX(-100vw)", position: "absolute", left: "-100vw" }}
                    onClick={saveBuffer}
                    onChange={handleOnChange}
                    {...rest}
                />
            </label>
        </fieldset >
    );
}
