import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import styles from './Toast.module.css';

const toastVariants = cva(styles.toastContainer, {
  variants: {
    variant: {
      info: styles.info,
      warning: styles.warning,
      danger: styles.danger,
      success: styles.success,
      light: styles.light,
      dark: styles.dark,
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string;
  duration?: number;
  onClose: () => void;
  onTimeOut?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  duration = 3000,
  onClose,
  onTimeOut,
  variant
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onTimeOut?.()
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for the animation to finish before calling onClose
  };

  return (
    <div className={`${toastVariants({ variant })} ${!isVisible ? styles.toastHide : ''}`}>
      <div className={styles.toastContent}>{message}</div>
      <button onClick={handleClose} className={styles.closeButton} aria-label="Close">
        <X size={18} />
      </button>
    </div>
  );
};

