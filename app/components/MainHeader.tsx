import clsx from "clsx";
import { useAtom } from "jotai";

import Logo from "~/components/svg/Logo";
import { Container } from "~/components/ui/container/Container";
import { Flex } from "~/components/ui/flex/Flex";
import { Header } from "~/components/ui/header/Header";
import { Link } from "~/components/ui/link/Link";
import MobileMenu from "~/components/ui/mobile-menu/MobileMenu";
import { showModalAtom } from "~/components/ui/mobile-menu/MobileMenu.state";
import { Nav, NavLink } from "~/components/ui/nav/Nav";
import { Viewport } from "~/components/ui/viewport/Viewport";

import { MenuIcon, X } from "lucide-react";
import { navigationLinks } from "~/constants";
import useStickyHeader from "~/hooks/useStickyHeader";
import styles from './MainHeader.module.css';
import { Drawer, DrawerCloseButton, DrawerContent, DrawerTrigger } from "./ui/drawer/Drawer";
import LucideIcon from "./ui/icon/LucideIcon";

function MainHeader() {
  const [, setShowModal] = useAtom(showModalAtom);
  const { headerRef, isSticky } = useStickyHeader()

  return (
    <Drawer>
      <div className={styles.spacer} />
      <Header ref={headerRef} className={clsx(styles.header, { [styles.sticky]: isSticky })} position="fixed" style={{ zIndex: 1 }}>
        <Container>
          <Viewport variant='mobile-hidden'>
            <Flex justify="between" align="center">
              <Link to="/" className="logo-link" title="Home Page">
                <span className="sr-only">Go to home-page</span>
                <Logo aria-hidden className={styles.logo} />
              </Link>
              <Nav className={styles.navigation}>
                {
                  navigationLinks.map(({ label, href, icon }) => (
                    <NavLink key={label} to={href}>{icon && <LucideIcon size={18} icon={icon} />} {label}</NavLink>
                  ))
                }
              </Nav>
            </Flex>
          </Viewport>
          <Viewport variant='mobile'>
            <Flex style={{ gap: '1rem' }} justify="between" align="center">
              <Link to="/" className="logo-link" title="Home Page">
                <span className="sr-only">Go to home-page</span>
                <Logo aria-hidden className={styles.logo} />
              </Link>
              <DrawerTrigger variant="ghost" size='sm'>
                <MenuIcon /><span className="sr-only">Menu</span>
              </DrawerTrigger>
            </Flex>
          </Viewport>
        </Container>
      </Header>
      <DrawerContent>
        <header>
          <DrawerCloseButton className={styles.close} variant="ghost" size="sm">
            <X /><span className="sr-only">Menu</span>
          </DrawerCloseButton>
          <MobileMenu.Padding>
            <Link to="/" className="logo-link" title="Home Page">
              <span className="sr-only">Go to home-page</span>
              <Logo aria-hidden className={styles.logo} />
            </Link>
          </MobileMenu.Padding>
        </header>
        <MobileMenu.Nav>
          {
            navigationLinks.map(({ href, label, icon }) => (
              <DrawerCloseButton asChild key={label} size='sm'>
                <NavLink to={href}>{icon && <LucideIcon icon={icon} />} {label}</NavLink>
              </DrawerCloseButton>
            ))
          }
        </MobileMenu.Nav>
      </DrawerContent>
    </Drawer>
  )
}

export default MainHeader