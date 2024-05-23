import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import styles from "~/styles/home.css";
import Logo from "~/components/svg/Logo";
import { Link, Outlet } from "@remix-run/react";
import { SITE_NAME } from "~/constants";
import Header from "~/components/header/Header";

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
      <Header />
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
