import { Link } from "@remix-run/react";

import styles from "./Button.module.css";
import cx from "classnames";
import { RemixLinkProps } from "@remix-run/react/dist/components";

export interface ButtonElementProps extends React.HTMLAttributes<HTMLButtonElement> {
    to?: never;
    type?: "button" | "submit" | "reset";
    loading?: boolean;
}

export interface LinkElementProps extends React.RefAttributes<HTMLAnchorElement> {
    loading?: boolean;
}

interface ButtonClassNames {
    color?: "default" | "primary" | "accent" | "danger" | "success" | "warning";
    size?: "sm" | "md" | "lg";
    variant?: "outline" | "solid";
    disabled?: boolean;
    className?: string;
}

type ButtonProps = ButtonElementProps & ButtonClassNames;
type LinkProps = LinkElementProps & ButtonClassNames & RemixLinkProps;
interface IconButtonProps {
    icon: React.ReactNode;
    after?: boolean
}

const getClassName = ({ color = "default", size = "md", variant = "solid", disabled = false, className }: ButtonClassNames): string => {
    return cx(styles.button,
        {
            [styles[variant]]: !!variant,
            [styles[color]]: !!color && !disabled,
            [styles[size]]: !!size,
        },
        className);
}

export function LinkState(props: RemixLinkProps) {


    return <Link {...props} state={state} />
}

type ButtonOrRemixLink = ButtonProps | LinkProps
export function Button(props: ButtonOrRemixLink) {
    const { className, color, size, variant, ...rest } = props;

    const clss = getClassName({ color, size, variant, className });

    if (props.to) {
        return <Link className={clss} {...rest as RemixLinkProps} />
    }

    return <button className={clss} {...rest as ButtonProps} />
}

export function IconButton(props: IconButtonProps & ButtonOrRemixLink) {
    const { after, icon, children, ...rest } = props;

    return (
        <Button className={styles.buttonIcon} {...rest}>
            {!after && <span className={styles.icon}>{icon}</span>}
            {children}
            {after && <span className={styles.icon}>{icon}</span>}
        </Button>
    )
}

export default Button