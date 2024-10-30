import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useRouteError
} from "@remix-run/react";
import Button from "~/components/ui/button/Button";
import { Container } from "~/components/ui/container/Container";
import { SITE_DESCRIPTION, SITE_TITLE } from "~/constants";
import globalStyles from "~/styles/global.css";
import resetStyles from "~/styles/helpers/reset.css";
import tailwindStyles from "~/styles/tailwind.css";
import { BaseHead } from "./components/BaseHead";

export const meta: MetaFunction = () => {
  return [
    { title: SITE_TITLE },
    { name: SITE_TITLE, content: SITE_DESCRIPTION },
  ];
};

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
        <BaseHead />
      </head>
      <body>
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

  let errorTitle = ">__< We could not load the page"
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
        <BaseHead />
      </head>
      <body>
        <div className="layout">
          <main className="main">
            <Container>
              <h1>{errorTitle}</h1>
              {errorDetail}
              <div>
                <Button onClick={goBack}>Go Back</Button>
              </div>
            </Container>
          </main>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
