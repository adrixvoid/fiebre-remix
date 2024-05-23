import type { LinksFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { ROUTE_PATH } from "~/constants";
import { getMarkdowns, type MarkdownDocument } from "~/server/utils/front-matter";
import styles from "~/styles/markdown.css";

export const loader = async () => {
  const metadata = await getMarkdowns('posts');
  return metadata;
};

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default function Posts() {
  const posts = useLoaderData<MarkdownDocument[]>();

  return (
    <section className="markdown">
      <div className="container">
        <div className="markdown-list">
          {posts.map((post) => (
            <article className="item" key={post.title}>
              <Link className="link" to={`${ROUTE_PATH.POST}/${post.slug}`}>
                <div className="image-container">
                  <div className="image-cover">
                    <img src={post.preview} alt={post.title} aria-hidden />
                  </div>
                </div>
                <div className="item-description">
                  <h2 className="title p">{post.title}</h2>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
