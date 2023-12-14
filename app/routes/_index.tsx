import type { LinksFunction, MetaFunction } from "@remix-run/node";
import styles from "~/styles/home.css";
import Logo from "~/components/svg/Logo";

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

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div className="hero">
        <div className="hero-content">
          <Logo className="hero-logo" />
          <nav className="hero-navigation">
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
      </div>
    </div>
  );
}
