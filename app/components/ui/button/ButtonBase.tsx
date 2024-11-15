import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { forwardRef } from "react";

import { type VariantProps } from 'class-variance-authority';

import { buttonVariants } from "./Button.cva";
import styles from './Button.module.css';

export type ButtonVariants = VariantProps<typeof buttonVariants>;


export type ButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants & {
  asChild?: boolean;
  fullWidth?: boolean;
}

export const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ className, variant, size, radius, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={clsx(buttonVariants({ variant, size, radius, className }), { [styles.fullWidth]: fullWidth })}
        {...props}
      />
    )
  }
)

ButtonBase.displayName = "ButtonBase"
