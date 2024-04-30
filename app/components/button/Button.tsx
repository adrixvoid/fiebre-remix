import { Link } from "@remix-run/react";

import styles from "./Button.module.css";
import cx from "classnames";
import { RemixLinkProps } from "@remix-run/react/dist/components";

export interface ButtonBaseProps extends React.HTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    type?: "button" | "submit" | "reset";
}

export interface ButtonProps {
    children?: React.ReactNode;
    type?: "button" | "submit" | "reset";
    className?: string;
    to?: RemixLinkProps['to'] & React.RefAttributes<HTMLAnchorElement>;
    onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
    color?: "default" | "primary" | "accent" | "danger" | "success" | "warning";
    size?: "sm" | "md" | "lg";
    variant?: "outline" | "solid";
    disabled?: boolean;
    loading?: boolean;
}

interface ButtonClassNames {
    color?: ButtonProps['color'];
    size?: ButtonProps['size'];
    variant?: ButtonProps['variant'];
    disabled?: ButtonProps['disabled'];
}

const getClassName = ({ color = "default", size = "md", variant = "solid", disabled = false, className }: ButtonClassNames & { className?: string }): string => {
    return cx(styles.button,
        {
            [styles[variant]]: !!variant,
            [styles[color]]: !!color && !disabled,
            [styles[size]]: !!size,
        },
        className);
}

export function ButtonBase(props: ButtonBaseProps) {
    return (
        <button className={props.className} {...props} />
    )
}

export function Button(props: ButtonProps) {
    const { className, color, size, variant, to, onClick = () => { }, ...rest } = props;

    const clss = getClassName({ color, size, variant, className });

    if (to) {
        return (
            <Link to={to} className={clss} {...rest} />
        )
    }

    return (
        <ButtonBase onClick={onClick} className={clss} {...rest} />
    )
}

export function IconButton(props: ButtonProps & { icon: React.ReactNode, after?: boolean }) {
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