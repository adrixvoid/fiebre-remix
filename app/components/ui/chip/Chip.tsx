import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { type ReactNode } from 'react';
import styles from './Chip.module.css';

export type ChipVariant = 'filled' | 'outlined';
export type ChipColor = 'default' | 'primary' | 'success' | 'warning' | 'error';

export interface ChipProps {
  children: ReactNode;
  variant?: ChipVariant;
  color?: ChipColor;
  onClick?: () => void;
  onDismiss?: () => void;
  className?: string;
  icon?: ReactNode;
}

export function Chip({
  children,
  variant = 'filled',
  color = 'default',
  onClick,
  onDismiss,
  className,
  icon,
}: ChipProps) {
  const chipClasses = clsx(
    styles.chip,
    styles[variant],
    color !== 'default' && styles[color],
    onClick && styles.clickable,
    onDismiss && styles.dismissible,
    className
  );

  return (
    <div
      className={chipClasses}
      onClick={onClick}
      role={onClick ? 'button' : 'status'}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
      {onDismiss && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className={styles.dismissButton}
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}