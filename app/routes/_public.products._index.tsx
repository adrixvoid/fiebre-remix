import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { productService } from "~/server/models/products.model"
import type { Product } from "~/types/global.type"

import { ROUTE_PATH } from "~/constants";

import markdownStyles from "~/styles/markdown.css";
import styles from "~/styles/store.css";

export const loader: LoaderFunction = async () => {
    const products = await productService.find();
    return { products };
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
    const { products } = useLoaderData<{ products: Product[] }>() as { products: Product[] };
    return (
        <section className="markdown">
            <div className="container">
                <div className="markdown-list">
                    {products.map((product) => (
                        <article className="item" key={product.title}>
                            <Link className="link" to={`${ROUTE_PATH.PRODUCT}/${product.slug}`}>
                                <div className="image-container">
                                    <div className="image-cover">
                                        <img src={product.images?.[0]?.fileName} alt={product.title} aria-hidden loading="lazy" />
                                    </div>
                                </div>
                                <div className="item-description">
                                    <h2 className="title p">{product.title}</h2>
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