import {cva, type VariantProps} from 'class-variance-authority';

import clsx from 'clsx';
import styles from './Button.module.css';

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      default: styles.base,
      primary: styles.primary,
      destructive: styles.destructive,
      outline: styles.outline,
      dashed: clsx(styles.outline, styles.dashed),
      ghost: styles.ghost,
      link: styles.link
    },
    size: {
      default: styles.medium,
      md: styles.medium,
      sm: styles.small,
      lg: styles.large
    },
    width: {
      ['full-width']: styles['full-width']
    }
  },
  // compoundVariants: [
  //   { variant: "default", size: "default", className: styles.primaryMedium },
  // ],
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});
