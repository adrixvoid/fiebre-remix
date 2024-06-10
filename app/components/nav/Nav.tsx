import { ReactNode } from "react";
import { clsx } from "clsx"

import styles from './Nav.module.css'

export function Nav({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <nav className={clsx(styles.nav, className)}>
      {children}
    </nav>
  )
}
