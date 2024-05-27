import useBlobImage from "./useBlobImage";


interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    name: string;
}

export default function ImageBlob(props: ImageProps) {
    const src = useBlobImage(props.src)
    return <img {...props} src={src} />;
}