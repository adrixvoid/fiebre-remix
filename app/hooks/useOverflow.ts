import useDocument from './useDocument';

// const document = useDocument();
// useEffect(() => {
//   let body = document?.querySelector('body');

//   if (open && body) {
//     body.style.overflow = "hidden";
//   } else {
//     if (body?.attributeStyleMap.has('overflow')) {
//       body?.attributeStyleMap.delete('overflow');
//     } else if (body?.style.overflow) { // FF Support
//       body.style.overflow = "";
//     }
//   }

//   return () => {
//     body = null;
//   }
// }, [open, document])

export function useOverflow({ref}: {ref: React.RefObject<HTMLDialogElement>}) {
  const document = useDocument();
  const open = ref.current?.open;

  function hideScroll() {
    let body = document?.querySelector('body');

    if (body) {
      body.style.overflow = 'hidden';
    }
  }

  function showScroll() {
    let body = document?.querySelector('body');
    if (body?.attributeStyleMap.has('overflow')) {
      body?.attributeStyleMap.delete('overflow');
    } else if (body?.style.overflow) {
      // FF Support
      body.style.overflow = '';
    }
  }

  return {
    hideScroll,
    showScroll
  };
}
