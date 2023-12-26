import type { LinksFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getProducts } from "~/server/products.server"
import type { Product } from "~/server/products.server"

import { ROUTE_PATH } from "~/constants";

import markdownStyles from "~/styles/markdown.css";
import styles from "~/styles/store.css";

export const loader = async () => {
    return getProducts()
}

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: markdownStyles,
    },
    {
        rel: "stylesheet",
        href: styles,
    },
];

const Store = () => {
    const products = useLoaderData<Product[]>();
    return (
        <section className="markdown">
            <div className="container">
                <div className="markdown-list">
                    {products.map((post) => (
                        <article className="item" key={post.title}>
                            <Link className="link" to={`${ROUTE_PATH.PRODUCT}/${post.slug}`}>
                                <div className="image-container">
                                    <div className="image-cover">
                                        <img src={post.preview} alt={post.title} aria-hidden loading="lazy" />
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
    )
}

export default Store