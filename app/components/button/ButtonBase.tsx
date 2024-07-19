import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { buttonVariants, type ButtonVariants } from "./Button.cva";

export interface ButtonBaseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  ButtonVariants {
  asChild?: boolean
}

const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    )
  }
)

ButtonBase.displayName = "ButtonBase"

export { ButtonBase, buttonVariants };
