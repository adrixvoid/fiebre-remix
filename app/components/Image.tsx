import { useEffect, useState } from "react";

export default function Image({ name, url }: { name: string; url: string }) {
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
            width={320}
            height={240}
        />
    );
}