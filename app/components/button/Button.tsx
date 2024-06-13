import { Link } from "@remix-run/react";
import { RemixLinkProps } from "@remix-run/react/dist/components";

import { ButtonBase, ButtonBaseProps } from "./ButtonBase";

export type ButtonProps = ButtonBaseProps & { to?: never } | RemixLinkProps & { variant?: ButtonBaseProps['variant'], size?: ButtonBaseProps['size'] }

export function Button(props: ButtonProps) {
    if (props.to) {
        return (
            <ButtonBase asChild variant={props.variant} size={props.size}>
                <Link {...props as RemixLinkProps} />
            </ButtonBase>
        )
    }

    return <ButtonBase {...props as ButtonBaseProps} />
}

export default Button