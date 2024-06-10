import type { LinksFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

// import { getCart } from "~/server/shoppingCart.server"
// import type { Product } from "~/server/products.service"

import { ROUTE_PATH } from "~/constants";

export const loader = async () => {
    // return getCart()
    return { products: [] };
}

const Cart = () => {
    const { products } = useLoaderData<typeof loader>();
    return (
        <section className="markdown">
            <div className="container">
                <div className="markdown-list">
                    {products.map((post) => (
                        // <article className="item box" key={post.title}>
                        //     <Link className="link" to={`${ROUTE_PATH.PRODUCT}/${post.slug}`}>
                        //         <div className="image-container">
                        //             <div className="image">
                        //                 <img src={post.preview} alt={post.title} aria-hidden />
                        //             </div>
                        //         </div>
                        //         <div className="item-description">
                        //             <h2 className="h5">{post.title}</h2>
                        //         </div>
                        //     </Link>
                        // </article>
                        <div>empty</div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Cart