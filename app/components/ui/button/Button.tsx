
import { forwardRef } from "react";
import { Link, LinkProps } from "../link/Link";
import { ButtonBase, ButtonBaseProps } from "./ButtonBase";

export type ButtonOrLinkProps = { to?: never } | LinkProps;

export type ButtonProps = ButtonOrLinkProps & ButtonBaseProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ asChild, variant, size, fullWidth, ...props }, ref) => {
    if (props.to && !asChild) {
        return (
            <ButtonBase ref={ref} asChild variant={variant} size={size} fullWidth={fullWidth}>
                <Link {...props as LinkProps} />
            </ButtonBase>
        )
    }

    return <ButtonBase ref={ref} {...props as ButtonBaseProps} asChild={asChild} variant={variant} size={size} fullWidth={fullWidth} />
});

export default Button