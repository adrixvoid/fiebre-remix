import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "@remix-run/react";
import { SITE_NAME } from "~/constants";
import resetStyles from "~/styles/helpers/reset.css";
import globalStyles from "~/styles/global.css";
import tailwindStyles from "~/styles/tailwind.css";
import Button from "./components/button/Button";

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
  },
];

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: resetStyles
  },
  {
    rel: "stylesheet",
    href: tailwindStyles
  },
  {
    rel: "stylesheet",
    href: globalStyles,
  },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" media="all" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,200;0,300;0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet"></link>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  let errorTitle = "Ok... 0__x We could not load the page"
  let errorDetail = null

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 401:
        errorDetail = <p>You don't have access to this page.</p>
      case 404:
        errorDetail = <p>Page not found!</p>;
      default:
        errorTitle = error.status.toString()
        errorDetail = <p>{error.statusText} {error.data.message}</p>
    }
  } else if (error instanceof Error) {
    errorDetail = error.message;
  }

  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" media="all" />
        <div className="layout">
          <main className="main">
            <div className="container">
              <h1>{errorTitle}</h1>
              {errorDetail}
              <div>
                <Button onClick={goBack}>Go Back</Button>
              </div>
            </div>
          </main>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
