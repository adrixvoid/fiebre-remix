import {cva, type VariantProps} from 'class-variance-authority';

import styles from './Button.module.css';

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      default: styles.base,
      primary: styles.primary,
      secondary: styles.secondary,
      destructive: styles.destructive,
      outline: styles.outline,
      dashed: styles.dashed,
      ghost: styles.ghost,
      link: styles.link
    },
    size: {
      default: styles.medium,
      sm: styles.small,
      lg: styles.large
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});
