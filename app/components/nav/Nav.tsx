import { NavLink as RemixNavLink } from "@remix-run/react";
import { clsx } from "clsx";
import { ReactNode } from "react";

import { LinkProps } from '~/components/link/Link';
import stylesLink from '~/components/link/Link.module.css';
import styles from './Nav.module.css';

export interface NavProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode, className?: string
}

export function Nav({ children, className }: NavProps) {
  return (
    <nav className={clsx(styles.nav, className)}>
      {children}
    </nav>
  )
}

export type NavLinkProps = LinkProps;

export function NavLink(props: NavLinkProps) {
  return (
    <RemixNavLink {...props} className={({ isActive, isPending }) => clsx(
      stylesLink.link,
      { "pending": isPending, [stylesLink.primary]: isActive },
      props.className
    )} />
  )
}
