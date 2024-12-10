import React from 'react';
import { useToast } from '~/hooks/useToast';
import { Toast } from './Toast';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          variant={toast.variant}
          onClose={() => removeToast(toast.id)}
          onTimeOut={() => setTimeout(() => removeToast(toast.id), 5000)}
        />
      ))}
    </>
  );
};
