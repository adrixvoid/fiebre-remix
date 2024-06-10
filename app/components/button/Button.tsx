import { Link } from "@remix-run/react";
import { RemixLinkProps } from "@remix-run/react/dist/components";

import { ButtonBase, ButtonProps } from "./ButtonBase";

type ButtonOrRemixLink = ButtonProps & { to?: never } | RemixLinkProps & { variant?: ButtonProps['variant'], size?: ButtonProps['size'] }

export function Button(props: ButtonOrRemixLink) {
    if (props.to) {
        return (
            <ButtonBase asChild variant={props.variant} size={props.size}>
                <Link {...props as RemixLinkProps} />
            </ButtonBase>
        )
    }

    return <ButtonBase {...props as ButtonProps} />
}

export default Button