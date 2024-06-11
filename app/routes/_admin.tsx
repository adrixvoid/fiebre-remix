import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { SITE_NAME } from "~/constants";

import Logo from "~/components/svg/Logo";
import { Link, NavLink } from "~/components/link/Link";
import styles from "~/styles/admin.css";
import { Nav } from "~/components/nav/Nav";
import { Button } from "~/components/button/Button";
import { Container } from "~/components/container/Container";

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
      <header className={"flex items-center py-3"}>
        <div className={`container static flex gap-2`}>
          <span className="sr-only">{SITE_NAME}</span>
          <Link to="/admin" className="flex items-center gap-1">
            <Logo aria-hidden className="logo" />
            <span className="ml-1">Admin</span>
          </Link>
          <Nav className='flex-1 justify-end'>
            <NavLink to="/admin/categories">Categories</NavLink>
            <NavLink to="/admin/content/create">Content</NavLink>
            <NavLink to="/">Exit</NavLink>
          </Nav>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <Container>
          <div className="text-sm">@2024 - {SITE_NAME} - <a href="https://www.behance.net/fiebre_creativa" title="My Behance portfolio">https://www.behance.net/fiebre_creativa</a></div>
          <Nav className="text-sm flex items-center align-center gap-2 pt-2">
            <Link to="/about">Sobre mi</Link>
            <Link to="/products">Tienda</Link>
            <Link to="/portfolio">Portafolio</Link>
            <Link to="/blog">Blog</Link>
          </Nav>
        </Container>
      </footer>
    </div>
  );
}

