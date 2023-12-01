import type { LinksFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getBlogs } from "~/server/markdown.server";
import type { Post } from "~/server/markdown.server";
import styles from "~/styles/posts.css";

export const loader = async () => {
  const metadata = await getBlogs();
  return metadata;
};

function Posts() {
  const posts = useLoaderData<Post[]>();

  return (
    <section className="posts">
      <div className="container posts-list">
        {posts.map((post) => (
          <article className="item" key={post.title}>
            <Link className="link" to={`/blog/${post.slug}`}>
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
    </section>
  );
}

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default Posts;
