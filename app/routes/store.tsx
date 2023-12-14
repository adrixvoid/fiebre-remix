import type { LinksFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getProducts } from "~/server/products.server"
import type { Product } from "~/server/products.server"

import { ROUTE_PATH } from "~/constants";

import postsStyles from "~/styles/posts.css";
import styles from "~/styles/store.css";

export const loader = async () => {
    return getProducts()
}

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: postsStyles,
    },
    {
        rel: "stylesheet",
        href: styles,
    },
];

const Store = () => {
    const products = useLoaderData<Product[]>();
    return (
        <section className="posts">
            <div className="container">
                <div className="posts-list">
                    {products.map((post) => (
                        <article className="item box" key={post.title}>
                            <Link className="link" to={`${ROUTE_PATH.PRODUCT}/${post.slug}`}>
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
    )
}

export default Store