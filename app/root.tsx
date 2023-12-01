import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import Logo from "~/components/logo/Logo";
import globalStyles from "~/styles/global.css";

const SITE_NAME = "Fiebre";

export const meta = () => [
  {
    title: SITE_NAME,
    description: "Fiebre Diseño",
  },
];

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  {
    rel: "stylesheet",
    href: globalStyles,
  },
];

function MainLayout() {
  return (
    <div className="page">
      <header className="header">
        <div className="header-container container">
          <Link to="/" className="logo">
            <div className="sr-only">{SITE_NAME} Admin</div>
            <img src='/logo.svg' alt={`Logo ${SITE_NAME}`} />
            {/* <Logo /> */}
          </Link>
          <nav>
            <ul>
              <li>
                <a href="/about">Sobre mi</a>
              </li>
              <li>
                <a href="/store">Tienda</a>
              </li>
              <li>
                <a href="/posts">Portafolio</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
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

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MainLayout />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
