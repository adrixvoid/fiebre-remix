import type { LinksFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/server/markdown.server";
import type { Post } from "~/server/markdown.server";
import styles from "~/styles/posts.css";

export const loader = async () => {
  const metadata = await getPosts();
  return metadata;
};

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default function Posts() {
  const posts = useLoaderData<Post[]>();

  return (
    <section className="posts">
      <div className="container">
        <div className="posts-list">
          {posts.map((post) => (
            <article className="item" key={post.title}>
              <Link className="link" to={`/post/${post.slug}`}>
                <div className="inner">
                  <div className="content">
                    <h2 className="title">{post.title}</h2>
                  </div>
                </div>
              </Link>
              <div className="image-container" style={{ backgroundImage: `url('${post.preview}')` }}>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
