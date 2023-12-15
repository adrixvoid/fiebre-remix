import type { LinksFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getCart } from "~/server/cart.server"
import type { Product } from "~/server/products.server"

import { ROUTE_PATH } from "~/constants";

import styles from "~/styles/cart.css";

export const loader = async () => {
    return getCart()
}

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: styles,
    },
];

const Cart = () => {
    const products = useLoaderData<[]>();
    return (
        <section className="markdown">
            <div className="container">
                <div className="markdown-list">
                    {products.map((post) => (
                        <article className="item box" key={post.title}>
                            <Link className="link" to={`${ROUTE_PATH.PRODUCT}/${post.slug}`}>
                                <div className="image-container">
                                    <div className="image-cover">
                                        <img src={post.preview} alt={post.title} aria-hidden />
                                    </div>
                                </div>
                                <div className="item-description">
                                    <h2 className="h5">{post.title}</h2>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Cart