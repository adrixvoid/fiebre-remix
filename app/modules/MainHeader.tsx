import clsx from "clsx";
import { useAtom } from "jotai";

import { Container } from "~/components/container/Container";
import { Flex } from "~/components/flex/Flex";
import { Header } from "~/components/header/Header";
import { Link } from "~/components/link/Link";
import MobileMenu from "~/components/mobile-menu/MobileMenu";
import { showModalAtom } from "~/components/mobile-menu/MobileMenu.state";
import { Nav, NavLink } from "~/components/nav/Nav";
import Logo from "~/components/svg/Logo";
import { Viewport } from "~/components/viewport/Viewport";

import useStickyHeader from "~/hooks/useStickyHeader";
import styles from './MainHeader.module.css';

function MainHeader() {
  const [, setShowModal] = useAtom(showModalAtom);
  const { headerRef, isSticky } = useStickyHeader()

  return (
    <>
      <div className={styles.spacer} />
      <Header ref={headerRef} className={clsx(styles.header, { [styles.sticky]: isSticky })} position="fixed" style={{ zIndex: 1 }}>
        <Container>
          <Viewport variant='mobile'>
            <Flex style={{ gap: '1rem' }} justify="between" align="center">
              <Link to="/" className="logo-link" title="Home Page">
                <Logo aria-hidden className={styles.logo} />
              </Link>
              <MobileMenu.ButtonHamburger />
            </Flex>
            <MobileMenu.Menu>
              <MobileMenu.Header>
                <MobileMenu.ButtonClose />
                <MobileMenu.Padding>
                  <Link to="/" className="logo-link" title="Home Page">
                    <span className="sr-only">Go to home-page</span>
                    <Logo aria-hidden className={styles.logo} />
                  </Link>
                </MobileMenu.Padding>
              </MobileMenu.Header>
              <MobileMenu.Nav>
                <MobileMenu.Link onClick={() => setShowModal(false)} to="/blog">Blog</MobileMenu.Link>
                <MobileMenu.Link onClick={() => setShowModal(false)} to="/portfolio">Proyectos</MobileMenu.Link>
                <MobileMenu.Link onClick={() => setShowModal(false)} to="/courses">Cursos</MobileMenu.Link>
                <MobileMenu.Link onClick={() => setShowModal(false)} to="/shop">Shop</MobileMenu.Link>
                <MobileMenu.Link onClick={() => setShowModal(false)} to="/about">Sobre mi</MobileMenu.Link>
              </MobileMenu.Nav>
            </MobileMenu.Menu>
          </Viewport>
          <Viewport variant='mobile-hidden'>
            <Flex justify="between" align="center">
              <Link to="/" className="logo-link" title="Home Page">
                <Logo aria-hidden className={styles.logo} />
              </Link>
              <Nav className={styles.navigation}>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to="/portfolio">Proyectos</NavLink>
                <NavLink to="/courses">Cursos</NavLink>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/about">Sobre mi</NavLink>
              </Nav>
            </Flex>
          </Viewport>
        </Container>
      </Header>
    </>
  )
}

export default MainHeader