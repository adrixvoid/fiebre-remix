import { NavLink as RemixNavLink } from "@remix-run/react";
import { clsx } from "clsx";
import { ReactNode } from "react";

import { RemixNavLinkProps } from "@remix-run/react/dist/components";
import stylesLink from '~/components/ui/link/Link.module.css';
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

export type NavLinkProps = RemixNavLinkProps;

export function NavLink(props: NavLinkProps) {
  return (
    <RemixNavLink {...props} className={({ isActive, isPending }) => clsx(
      stylesLink.link,
      { "pending": isPending, [styles.active]: isActive },
      props.className
    )} />
  )
}
