import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import styles from "./Button.module.css";

const buttonVariants = cva(
  styles.button,
  {
    variants: {
      variant: {
        default: styles.base,
        primary: styles.primary,
        secondary: styles.secondary,
        destructive: styles.destructive,
        outline: styles.outline,
        dashed: styles.dashed,
        ghost: "",
        link: styles.link,
      },
      size: {
        default: styles.medium,
        sm: styles.small,
        lg: styles.large,
      },
    },
    // compoundVariants: [
    //   { variant: "default", size: "default", className: styles.primaryMedium },
    // ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    )
  }
)

ButtonBase.displayName = "ButtonBase"

export { ButtonBase, buttonVariants }
