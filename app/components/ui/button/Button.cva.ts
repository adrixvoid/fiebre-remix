import {cva, type VariantProps} from 'class-variance-authority';

import clsx from 'clsx';
import styles from './Button.module.css';

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      base: styles.base,
      primary: styles.primary,
      destructive: styles.destructive,
      outline: styles.outline,
      dashed: clsx(styles.outline, styles.dashed),
      ghost: styles.ghost,
      link: styles.link
    },
    size: {
      xs: styles.xsmall,
      sm: styles.small,
      md: styles.medium,
      lg: styles.large
    },
    radius: {
      sm: styles['radius-sm'],
      md: styles['radius-md'],
      lg: styles['radius-lg']
    }
  },
  // compoundVariants: [
  //   { variant: "default", size: "default", className: styles.primaryMedium },
  // ],
  defaultVariants: {
    variant: 'base',
    size: 'md',
    radius: 'md'
  }
});
