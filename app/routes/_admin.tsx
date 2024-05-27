import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, NavLink, Outlet } from "@remix-run/react";
import cx from "classnames";

import { SITE_NAME } from "~/constants";

import Logo from "~/components/svg/Logo";
import headerStyles from "~/components/header/Header.module.css";
import styles from "~/styles/admin.css";

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
      <header className={headerStyles.header}>
        <div className={`${headerStyles.headerContainer} container`}>
          <span className="sr-only">{SITE_NAME}</span>
          <div className={cx(headerStyles.logo, 'flex')}>
            <Logo aria-hidden />
            <Link to="/admin">
              <span className="ml-1">Admin</span>
            </Link>
          </div>
          <nav className={headerStyles.headerNavigation}>
            <NavLink to="/admin/categories">Categories</NavLink>
            <NavLink to="/admin/content/create">Content</NavLink>
            <NavLink to="/">Exit</NavLink>
          </nav>
        </div>
      </header>
      <nav className="hero-navigation">
        <ul>
          <li>
            <a href="/about">Sobre mi</a>
          </li>
          <li>
            <a href="/products">Tienda</a>
          </li>
          <li>
            <a href="/posts">Portafolio</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
        </ul>
      </nav>
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

