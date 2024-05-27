import {useEffect, useState} from 'react';

export default function useBlobImage(src: string | undefined) {
  // Here we store the object URL in a state to keep it between renders
  let [objectUrl] = useState(() => {
    if (src?.startsWith('blob:')) return src;
    return undefined;
  });

  useEffect(() => {
    // If there's an objectUrl but the `url` is not a blob anymore, we revoke it
    if (objectUrl && !src?.startsWith('blob:')) URL.revokeObjectURL(objectUrl);
  }, [objectUrl, src]);

  return src;
}
