import { clsx } from "clsx";
import { ReactNode } from "react";

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
