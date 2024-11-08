import clsx from "clsx";

import { Drawer, DrawerCloseButton, DrawerContent } from '~/components/ui/drawer/Drawer';
import { Nav as NavBase, type NavProps } from "~/components/ui/nav/Nav";

import styles from "./MobileMenu.module.css";

export function MobileHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return <header {...props} />
}

export function MobileNav({ className, ...props }: NavProps) {
  return <NavBase className={clsx(styles.nav, className)} {...props} />
}

export function MobilePadding({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(styles.padding, className)} {...props} />
}

export default {
  ButtonClose: DrawerCloseButton,
  Header: MobileHeader,
  Nav: MobileNav,
  Padding: MobilePadding,
  Menu: DrawerContent,
  Provider: Drawer
};
