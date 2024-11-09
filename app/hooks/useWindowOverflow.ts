import {useEffect, useState} from 'react';

export function useWindowOverflow({ref}: {ref: React.RefObject<HTMLElement>}) {
  const [windowOverflow, setWindowOverflow] = useState(false);

  const calculateOverflow = () => {
    let coords = ref.current?.getBoundingClientRect() || {right: 0};
    return (window?.innerWidth || 0) < coords.right;
  };

  useEffect(() => {
    setWindowOverflow(calculateOverflow());
  }, []);

  return {
    calculateOverflow,
    isOverflow: windowOverflow
  };
}
