import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { forwardRef } from "react";

import { cva, type VariantProps } from 'class-variance-authority';

import styles from './Button.module.css';

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
    }
  },
  // compoundVariants: [
  //   { variant: "default", size: "default", className: styles.primaryMedium },
  // ],
  defaultVariants: {
    variant: 'base',
    size: 'md'
  }
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;


export type ButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants & {
  asChild?: boolean;
  fullWidth?: boolean;
}

export const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={clsx(buttonVariants({ variant, size, className }), { [styles.fullWidth]: fullWidth })}
        {...props}
      />
    )
  }
)

ButtonBase.displayName = "ButtonBase"
