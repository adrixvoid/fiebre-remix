import { useEffect, useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    name: string;
    url: string;
}

export default function Image({ name, url, ...rest }: ImageProps) {
    // Here we store the object URL in a state to keep it between renders
    let [objectUrl] = useState(() => {
        if (url.startsWith("blob:")) return url;
        return undefined;
    });

    useEffect(() => {
        // If there's an objectUrl but the `url` is not a blob anymore, we revoke it
        if (objectUrl && !url.startsWith("blob:")) URL.revokeObjectURL(objectUrl);
    }, [objectUrl, url]);

    return (
        <img
            alt={name}
            src={url}
            {...rest}
        />
    );
}