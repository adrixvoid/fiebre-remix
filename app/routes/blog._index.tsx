import type { LinksFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAllMarkdownsFromDirectory } from "~/server/markdown.server";
import type { MarkdownDocument } from "~/server/markdown.server";
import styles from "~/styles/blog.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const loader = async () => {
  const metadata = await getAllMarkdownsFromDirectory('blog');
  return metadata;
};

function Posts() {
  const posts = useLoaderData<MarkdownDocument[]>();

  return (
    <section className="blogs">
      <div className="container list">
        {posts.map((post) => (
          <article className="item box" key={post.title}>
            <img src={post.preview} alt={post.title} aria-hidden />
            <Link className="link" to={`/blog/${post.slug}`}>
              <h2 className="title">{post.title}</h2>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Posts;
