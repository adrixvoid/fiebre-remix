import { Link as RemixLink } from "@remix-run/react";
import { RemixLinkProps } from "@remix-run/react/dist/components";
import { cx } from "class-variance-authority";
import clsx from "clsx";
import { forwardRef, PropsWithChildren } from "react";

import styles from './Link.module.css';

type LinkOrRemixLink = RemixLinkProps | React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to?: never
};
export type LinkProps = LinkOrRemixLink;

export const Link = forwardRef<HTMLButtonElement, PropsWithChildren<LinkProps>>(
  ({ className, ...props }, ref) => {
    if (!props.to) {
      return (
        <a {...props} className={clsx(styles.link, className)} />
      );
    }

    return <RemixLink {...props as RemixLinkProps} className={cx(styles.link, className)} />
  }
)