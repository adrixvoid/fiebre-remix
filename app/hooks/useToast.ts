import {atom, useAtom} from 'jotai';
import {useCallback} from 'react';

interface Toast {
  id: number;
  message: string;
  variant?: 'info' | 'warning' | 'danger' | 'success' | 'light' | 'dark';
}

const toastsAtom = atom<Toast[] | []>([]);

export const useToast = () => {
  const [toasts, setToasts] = useAtom<Toast[] | []>(toastsAtom);

  const addToast = useCallback(
    (message: string, variant?: Toast['variant']) => {
      setToasts((prevToasts) => [
        ...prevToasts,
        {id: Date.now(), message, variant}
      ]);
    },
    []
  );

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return {toasts, addToast, removeToast};
};
