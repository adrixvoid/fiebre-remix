import clsx from "clsx";
import { useAtom } from "jotai";
import { Menu as MenuIcon, X } from "lucide-react";

import { Button, ButtonProps } from "~/components/button/Button";
import { Drawer } from '~/components/drawer/Drawer';
import { Nav as NavBase, NavLink, NavProps } from "~/components/nav/Nav";

import { RemixNavLinkProps } from "@remix-run/react/dist/components";
import styles from "./MobileMenu.module.css";
import { showModalAtom } from "./MobileMenu.state";

interface MobileMenuProps {
  children: React.ReactNode;
  className?: string;
}

export function Menu({ children, className }: MobileMenuProps) {
  const [showModal, setShowModal] = useAtom(showModalAtom);
  return (
    <div className={className}>
      <Drawer open={showModal} onClose={() => setShowModal(false)}>
        {children}
      </Drawer>
    </div>
  );
}

type ButtonDrawerProps = ButtonProps & { onClick?: (event: React.MouseEvent) => void };
export function ButtonClose({ onClick, className, ...props }: ButtonDrawerProps) {
  const [showModal, setShowModal] = useAtom(showModalAtom);

  const handleOnClick = (event: React.MouseEvent) => {
    setShowModal(!showModal);
    onClick?.(event);
  }

  return (
    <Button className={clsx(styles.close, className)} variant="ghost" size="sm" onClick={handleOnClick} {...props}>
      <X /><span className="sr-only">Menu</span>
    </Button>
  )
}

export function ButtonHamburger({ onClick, className, ...props }: ButtonDrawerProps) {
  const [showModal, setShowModal] = useAtom(showModalAtom);
  const handleOnClick = (event: React.MouseEvent) => {
    setShowModal(!showModal);
    onClick?.(event);
  }
  return (
    <Button variant="ghost" className={clsx(styles.button, className)} onClick={handleOnClick} {...props}>
      <MenuIcon /><span className="sr-only">Menu</span>
    </Button>
  )
}

export function Header(props: React.HTMLAttributes<HTMLDivElement>) {
  return <header {...props} />
}

export function Nav({ className, ...props }: NavProps) {
  return <NavBase className={clsx(styles.nav, className)} {...props} />
}

export function Link({ onClick, ...props }: RemixNavLinkProps & { onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void }) {
  const [, setShowModal] = useAtom(showModalAtom);
  const handleOnClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    onClick?.(event);
    setShowModal(false)
  }
  return <NavLink onClick={handleOnClick} {...props} />
}

export function Padding({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(styles.padding, className)} {...props} />
}

export default {
  ButtonHamburger,
  ButtonClose,
  Header,
  Link,
  Nav,
  Menu,
  Padding
};

