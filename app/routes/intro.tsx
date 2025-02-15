import type { LinksFunction, LoaderFunction } from "@remix-run/node";

import Logo from "~/components/svg/Logo";

import styles from "~/styles/intro.css";

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

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div className="hero">
        <div className="hero-body">
          <Logo className="hero-logo" />
          <nav className="hero-navigation">
            <ul>
              <li>
                <a href="/about">Sobre mi</a>
              </li>
              <li>
                <a href="/products">Tienda</a>
              </li>
              <li>
                <a href="/portfolio">Portafolio</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
