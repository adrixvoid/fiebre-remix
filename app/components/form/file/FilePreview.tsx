import { useRef, useCallback } from "react";
import { create } from 'zustand'

import Image from "~/components/Image";
import styles from "./FilePreview.module.css";

type UploadFileProps = {
    id: string;
    name: string;
};

type FilePreview = {
    type: string;
    name: string;
    url: string;
};

function createPreviewArray(files: FileList | null) {
    if (files) {
        return Array.from(files).map((file) => {
            let returnObject = { type: file.type, name: file.name, url: '' };
            if (file.type.match("image")) {
                returnObject.url = URL.createObjectURL(file);
            }
            return returnObject;
        }).filter((file) => file !== undefined) as FilePreview[];
    }
    return [];
}

interface State {
    preview: FilePreview[];
    setPreview: (preview: FilePreview[]) => void;
    deletePreview: (fileName: string) => void;
}

const useStore = create<State>((set) => ({
    preview: [],
    setPreview: (previewArray: FilePreview[]) => {
        console.log({ previewArray })
        return set((state) => {
            // if file was already attached we don't want to add it again
            const newPreview = previewArray.filter((file) => {
                console.log("file", file)
                return !state.preview.some((prevFile) => prevFile.name === file.name);
            });

            console.log({ newPreview })

            return ({ preview: [...state.preview, ...newPreview] })
        })
    },
    deletePreview: (fileName: string) => {
        return set((state) => {
            URL.revokeObjectURL(state.preview.find((file: FilePreview) => file.name === fileName)?.url || "");
            return ({ preview: state.preview.filter((file: FilePreview) => file.name !== fileName) || [] })
        })
    },
}))

export function useFileUpload() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { preview, setPreview, deletePreview } = useStore()

    console.log({ preview })

    const handleOnDeleteFile = useCallback((fileName: string) => {
        try {
            const inputCurrent = inputRef.current;

            if (!inputCurrent || !inputCurrent?.files) {
                throw new Error("No files attached");
            }

            const dT = new DataTransfer();
            Array.from(inputCurrent.files).map((file) => {
                if (file.name !== fileName) {
                    dT.items.add(file);
                }
            });
            inputCurrent.files = dT.files;

            deletePreview(fileName);
        } catch (error) {
            console.log(error)
        }
    }, [deletePreview])

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = (event.target as HTMLInputElement).files || null;
        const previewArray = createPreviewArray(files);
        setPreview(previewArray);
    }, [setPreview])

    return {
        inputRef,
        preview,
        handleOnDeleteFile,
        handleFileChange
    };
}

export default function UploadFile({ id = "file", name = "file" }: UploadFileProps) {
    let { inputRef, preview, handleOnDeleteFile, handleFileChange } = useFileUpload();

    console.log("RENDER PREVIEW", preview)
    console.log("UploadFile preview", preview)
    console.log("inputRef.current.files", inputRef.current?.files)

    return (
        <fieldset className={styles.fieldset}>
            <label htmlFor="file">
                <span role="button" className="button secondary inline-block">Select file...
                    <input
                        ref={inputRef}
                        tabIndex={0}
                        id={id}
                        name={name}
                        type="file"
                        style={{ transform: "translateX(-100vw)", position: "absolute", left: "-100vw" }}
                        onChange={handleFileChange}
                        multiple
                    />
                </span>
            </label>
            {preview.length > 0 &&
                <ul className={`box ${styles.preview}`}>
                    {preview.map((file: FilePreview) => (
                        <li key={file.name} className={`${styles.item}`}>
                            {file.type.match("image") && <span className="block"><Image name={file.name} url={file.url} /></span>}
                            <div className={`${styles.description}`}>
                                <span className={`${styles.badge} inline-block`}>{file.name}</span>
                                <button className="button danger" onClick={() => handleOnDeleteFile(file.name)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>}
        </fieldset>
    );
}