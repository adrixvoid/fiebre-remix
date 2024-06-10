import { Link, Outlet } from "@remix-run/react";
import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";

import { SITE_NAME } from "~/constants";

import Logo from "~/components/svg/Logo";
import { Nav } from "~/components/nav/Nav";
import { NavLink } from "~/components/link/Link";

import styles from "~/styles/layout/public.css";

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
  },
];

// export const loader: LoaderFunction = ({ params }) => {
//   const lang = params.lang as string;
//   console.log("lang", lang)
//   return {};
// }

export default function AdminLayout() {
  return (
    <div className="layout">
      <header>
        <div className="header-static container">
          <Link to="/" className="logo-link">
            <span className="sr-only">Go to home-page</span>
            <Logo aria-hidden className="logo" />
          </Link>
          <Nav>
            <NavLink to="/about">Sobre mi</NavLink>
            <NavLink to="/products">Tienda</NavLink>
            <NavLink to="/portfolio">Portafolio</NavLink>
            <NavLink to="/blog">Blog</NavLink>
          </Nav>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container">
          @2024 - {SITE_NAME} - <a href="https://www.behance.net/fiebre_creativa" title="My Behance portfolio">https://www.behance.net/fiebre_creativa</a>
        </div>
      </footer>
    </div>
  );
}
