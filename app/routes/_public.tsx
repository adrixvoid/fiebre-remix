import { Link, Outlet } from "@remix-run/react";
import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";

import styles from "~/styles/home.css";
import { SITE_NAME } from "~/constants";

import Logo from "~/components/svg/Logo";
import { Nav } from "~/components/nav/Nav";
import { Button } from "~/components/ui/button";
import { NavLink } from "~/components/link/Link";

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

export const loader: LoaderFunction = ({ params }) => {
  const lang = params.lang as string;
  console.log("lang", lang)
  return {};
}

export default function AdminLayout() {
  return (
    <div className="layout">
      <header className={"flex items-center space-between py-3"}>
        <div className={`container static flex gap-2`}>
          <Link to="/" className={"flex items-center px-0"}>
            <span className="sr-only">Go to home-page</span>
            <div className={"items-center"}>
              <Logo aria-hidden className="h-10" />
            </div>
          </Link>
          <div className="flex-1 justify-end flex">
            <Nav>
              <NavLink to="/about">Sobre mi</NavLink>
              <NavLink to="/products">Tienda</NavLink>
              <NavLink to="/posts">Portafolio</NavLink>
              <NavLink to="/blog">Blog</NavLink>
            </Nav>
          </div>
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
