import type { LinksFunction, MetaFunction } from "@remix-run/node";
import styles from "~/styles/home.css";

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
      <div className="hero" />
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a href="posts" rel="noreferrer">
            Posts
          </a>
        </li>
        <li>
          <a href="blog" rel="noreferrer">
            Blog
          </a>
        </li>
        <li>
          <a href="about" rel="noreferrer">
            About
          </a>
        </li>
      </ul>
    </div>
  );
}
