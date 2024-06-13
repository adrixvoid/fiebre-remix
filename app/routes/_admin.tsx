import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { ROUTE_PATH_ADMIN, SITE_NAME } from "~/constants";

import Logo from "~/components/svg/Logo";
import { Link, NavLink } from "~/components/link/Link";
import styles from "~/styles/admin.css";
import { Nav } from "~/components/nav/Nav";
import { Button } from "~/components/button/Button";
import { Container } from "~/components/container/Container";
import { Grid } from "~/components/grid/Grid";
import { Flex } from "~/components/flex/Flex";
import { Header } from "~/components/header/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  }
];

export const loader: LoaderFunction = ({ params }) => {
  const lang = params.lang as string;
  return {};
}

export default function Admin() {
  return (
    <div className="layout">
      <Header>
        <Container>
          <Flex justify="between" align="center">
            <Link to="/admin" className="flex items-center gap-1">
              <Logo aria-hidden className="logo" />
              <span className="sr-only">{SITE_NAME}</span>
              <span className="ml-1">Admin</span>
            </Link>
            <Nav>
              <NavLink to={ROUTE_PATH_ADMIN.CATEGORY_LIST}>Categories</NavLink>
              <NavLink to={ROUTE_PATH_ADMIN.CONTENT_CREATE}>Content</NavLink>
              <NavLink to="/">Web</NavLink>
            </Nav>
          </Flex>
        </Container>
      </Header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

