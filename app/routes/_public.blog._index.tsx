import type { LinksFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getMarkdowns } from "~/server/utils/front-matter";
import styles from "~/styles/blog.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const loader = async () => {
  return await getMarkdowns('blog');
};

function Posts() {
  const posts = useLoaderData<typeof loader>();

  return (
    <section className="blogs">
      <div className="container list">
        {posts.map((post) => (
          <article className="item" key={post.title}>
            <img src={post.preview} alt={post.title} aria-hidden />
            <Link className="link" to={`/blog/${post.slug}`}>
              <h2 className="title p">{post.title}</h2>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Posts;
