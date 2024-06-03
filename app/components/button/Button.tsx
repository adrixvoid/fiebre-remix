import { Link } from "@remix-run/react";
import { RemixLinkProps } from "@remix-run/react/dist/components";

import { Button as UIButton, ButtonProps } from "~/components/ui/button";

type ButtonOrRemixLink = ButtonProps & { to?: never } | RemixLinkProps & { variant: ButtonProps['variant'], size: ButtonProps['size'] }

export function Button(props: ButtonOrRemixLink) {
    if (props.to) {
        return (
            <UIButton asChild variant={props.variant} size={props.size}>
                <Link {...props as RemixLinkProps} />
            </UIButton>
        )
    }

    return <UIButton {...props as ButtonProps} />
}

export default Button