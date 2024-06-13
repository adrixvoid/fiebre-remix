import type { LinksFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import { Mail } from "lucide-react";

import { SITE_NAME } from "~/constants";

import Button from "~/components/button/Button";
import { Center } from "~/components/center/Center";
import { Container } from "~/components/container/Container";
import { Flex } from "~/components/flex/Flex";
import { Grid } from "~/components/grid/Grid";
import { Header } from "~/components/header/Header";
import { NavLink } from "~/components/link/Link";
import { Nav } from "~/components/nav/Nav";
import { Skeleton } from "~/components/skeleton/Skeleton";
import { Behance, Instagram, Linkedin, Pinterest } from "~/components/svg";
import Logo from "~/components/svg/Logo";

import styles from "~/styles/layout/public.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

// export const loader: LoaderFunction = ({ params }) => {
//   const lang = params.lang as string;
//   console.log("lang", lang)
//   return {};
// }

export default function PublicLayout() {
  return (
    <div className="layout">
      <Header>
        <Container>
          <Flex justify="between" align="center">
            <Link to="/" className="logo-link">
              <span className="sr-only">Go to home-page</span>
              <Logo aria-hidden className="logo" />
            </Link>
            <Nav>
              <NavLink to="/blog">Blog</NavLink>
              <NavLink to="/portfolio">Proyectos</NavLink>
              <NavLink to="/courses">Cursos</NavLink>
              <NavLink to="/shop">Shop</NavLink>
              <NavLink to="/about">Sobre mi</NavLink>
            </Nav>
          </Flex>
        </Container>
      </Header>
      <main className="main">
        <Outlet />
      </main>
      <Skeleton height="20dvh" style={{ minHeight: "152px" }}>
        <footer className="footer">
          <Container>
            <Grid>
              <Center style={{ justifyContent: "flex-start" }}>
                {SITE_NAME}
              </Center>
              <Nav>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to="/portfolio">Proyectos</NavLink>
                <NavLink to="/courses">Cursos</NavLink>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/about">Sobre mi</NavLink>
              </Nav>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="link" to="mailto:fiebredg@hotmail.com" title="Contact me fiebredg@hotmail.com" rel="noopener noreferrer">
                  <Mail />
                </Button>
                <Button variant="link">
                  <Linkedin />
                </Button>
                <Button variant="link">
                  <Pinterest />
                </Button>
                <Button variant="link" to="https://www.instagram.com/fiebre.creativa/" title="My Instagram" rel="noopener noreferrer">
                  <Instagram />
                </Button>
                <Button variant="link" to="https://www.behance.net/fiebre_creativa" title="My Behance portfolio" rel="noopener noreferrer">
                  <Behance />
                </Button>
              </div>
            </Grid>
          </Container>
        </footer>
      </Skeleton>
    </div>
  );
}
