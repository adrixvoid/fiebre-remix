import { Link as RemixLink } from "@remix-run/react";
import { RemixLinkProps } from "@remix-run/react/dist/components";
import { cx } from "class-variance-authority";
import clsx from "clsx";
import { PropsWithChildren } from "react";

import styles from './Link.module.css';

type LinkOrRemixLink = RemixLinkProps | React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to?: never
};
export type LinkProps = LinkOrRemixLink;

export function Link({ className, ...props }: PropsWithChildren<LinkProps>) {
  if (!props.to) {
    return (
      <a {...props} className={clsx(styles.link, className)} />
    );
  }

  return <RemixLink {...props as RemixLinkProps} className={cx(styles.link, className)} />
}
