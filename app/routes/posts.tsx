import type { LinksFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getAllMarkdownsFromDirectory } from "~/server/markdown.server";
import type { MarkdownDocument } from "~/server/markdown.server";

import { ROUTE_PATH } from "~/constants";

import styles from "~/styles/posts.css";

export const loader = async () => {
  const metadata = await getAllMarkdownsFromDirectory('posts');
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
    <section className="posts">
      <div className="container">
        <div className="posts-list">
          {posts.map((post) => (
            <article className="item box" key={post.title}>
              <Link className="link" to={`${ROUTE_PATH.POST}/${post.slug}`}>
                <div className="image-container">
                  <div className="image-cover" style={{ backgroundImage: `url('${post.preview}')` }}></div>
                </div>
                <div className="item-tooltip">
                  <h2 className="title ellipsis">{post.title}</h2>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
