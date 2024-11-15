import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import React from 'react';
import styles from './Alert.module.css';

const alertVariants = cva(styles.alert, {
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

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof alertVariants> {
  title?: string;
  onClose?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, children, onClose, ...props }, ref) => {
    const Icon = {
      info: Info,
      warning: AlertTriangle,
      danger: XCircle,
      success: CheckCircle,
      dark: Info,
      light: Info,
    }[variant || "info"];

    return (
      <div
        ref={ref}
        role="alert"
        className={clsx(alertVariants({ variant }), className)}
        {...props}
      >
        <div className={styles.iconWrapper}>
          <Icon className={styles.icon} aria-hidden="true" />
        </div>
        <div className={styles.content}>
          {title && <h5 className={styles.title}>{title}</h5>}
          <div className={styles.message}>{children}</div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close alert"
          >
            <X className={styles.closeIcon} aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';