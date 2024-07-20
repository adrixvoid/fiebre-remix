import { Link } from "@remix-run/react";
import { RemixLinkProps } from "@remix-run/react/dist/components";

import { ButtonVariants } from "./Button.cva";
import { ButtonBase, ButtonBaseProps } from "./ButtonBase";

export type ButtonOrLink = ButtonBaseProps & { to?: never } | RemixLinkProps;

export type ButtonProps = ButtonOrLink & ButtonVariants & {
    asChild?: boolean
}

export function Button({ asChild, ...props }: ButtonProps) {
    if (props.to && !asChild) {
        return (
            <ButtonBase asChild variant={props.variant} size={props.size}>
                <Link {...props as RemixLinkProps} />
            </ButtonBase>
        )
    }

    return <ButtonBase {...props as ButtonBaseProps} asChild={asChild} />
}

export default Button