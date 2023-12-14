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

import Logo from "~/components/svg/Logo";
import globalStyles from "~/styles/global.css";

const SITE_NAME = "Fiebre";

export const meta = () => [
  {
    title: SITE_NAME,
    description: "Fiebre Diseño",
  },
];


// import script from cdn
export const scripts: LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com"
  }
];

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap",
    media: "all",
    onLoad: "this.media='all'",
  },
  {
    rel: "stylesheet",
    href: globalStyles,
  }
];

function MainLayout() {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-container container">
          <Link to="/" className="logo">
            <span className="sr-only">{SITE_NAME}</span>
            <Logo aria-hidden />
          </Link>
          <nav className="header-navigation">
            <span>
              <a href="/about">Sobre mi</a>
            </span>
            <span>
              <a href="/store">Tienda</a>
            </span>
            <span>
              <a href="/posts">Portafolio</a>
            </span>
            <span>
              <a href="/blog">Blog</a>
            </span>
          </nav>
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
