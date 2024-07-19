import { RemixNavLinkProps } from "@remix-run/react/dist/components";
import clsx from "clsx";
import { atom, useAtom } from "jotai";
import { Menu as MenuIcon, X } from "lucide-react";

import { Nav as NavBase, NavProps } from "~/components/nav/Nav";
import Button from "../button/Button";
import { Drawer } from '../drawer/Drawer';
import { NavLink } from "../link/Link";


import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  children: React.ReactNode;
  className?: string;
}

export const showModalAtom = atom(false);

function Menu({ children, className, ...props }: MobileMenuProps) {
  const [showModal, setShowModal] = useAtom(showModalAtom);
  return (
    <div>
      <Button variant="ghost" size="sm" className={styles.button} onClick={() => setShowModal(!showModal)}>
        <MenuIcon /><span className="sr-only">Menu</span>
      </Button>
      <Drawer open={showModal} onClose={() => setShowModal(false)}>
        <Button className={styles.close} variant="ghost" size="sm" onClick={() => setShowModal(!showModal)}>
          <X /><span className="sr-only">Menu</span>
        </Button>
        {children}
      </Drawer>
    </div>
  );
}

function Header({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <header className={clsx(styles.header, className)} {...props} />
}

function Nav({ className, ...props }: NavProps) {
  return <NavBase className={clsx(styles.nav, className)} {...props} />
}

function Link({ className, onClick, ...props }: RemixNavLinkProps) {
  const [_, setShowModal] = useAtom(showModalAtom);
  const handleOnClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    onClick?.(event);
    setShowModal(false)
  }
  return <NavLink onClick={handleOnClick} {...props} />
}

function Padding({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(styles.padding, className)} {...props} />
}

export default {
  Header,
  Link,
  Nav,
  Menu,
  Padding
};

