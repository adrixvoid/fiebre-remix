import { Link } from "@remix-run/react";
import { RemixLinkProps } from "@remix-run/react/dist/components";

import { forwardRef } from "react";
import { ButtonVariants } from "./Button.cva";
import { ButtonBase, ButtonBaseProps } from "./ButtonBase";

export type ButtonOrLink = ButtonBaseProps & { to?: never } | RemixLinkProps;

export type ButtonProps = ButtonOrLink & ButtonVariants & {
    asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ asChild, ...props }, ref) => {
    if (props.to && !asChild) {
        return (
            <ButtonBase ref={ref} asChild variant={props.variant} size={props.size}>
                <Link {...props as RemixLinkProps} />
            </ButtonBase>
        )
    }

    return <ButtonBase ref={ref} {...props as ButtonBaseProps} asChild={asChild} />
});

export default Button