
import { forwardRef } from "react";
import { Link, LinkProps } from "../link/Link";
import { ButtonVariants } from "./Button.cva";
import { ButtonBase, ButtonBaseProps } from "./ButtonBase";

export type ButtonOrLink = ButtonBaseProps & { to?: never } | LinkProps;

export type ButtonProps = ButtonOrLink & ButtonVariants & {
    asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ asChild, variant, size, width, ...props }, ref) => {
    if (props.to && !asChild) {
        return (
            <ButtonBase ref={ref} asChild variant={variant} size={size} width={width}>
                <Link {...props as LinkProps} />
            </ButtonBase>
        )
    }

    return <ButtonBase ref={ref} {...props as ButtonBaseProps} asChild={asChild} variant={variant} size={size} width={width} />
});

export default Button