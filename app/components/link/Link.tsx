import { Link as RemixLink, NavLink as RemixNavLink } from "@remix-run/react";
import { RemixLinkProps, RemixNavLinkProps } from "@remix-run/react/dist/components";
import { cx } from "class-variance-authority";

import styles from './Link.module.css';

export function Link({ className, ...props }: RemixLinkProps) {
  return <RemixLink {...props} className={cx(styles.link, className)} />
}

export function NavLink(props: RemixNavLinkProps) {
  return (
    <RemixNavLink {...props} className={({ isActive, isPending }) => cx(
      styles.link,
      { "pending": isPending, [styles.primary]: isActive },
      props.className
    )} />
  )
}
