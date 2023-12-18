import type { LoaderFunctionArgs, LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node";

import { getProduct } from "~/server/products.server"
import type { Product } from "~/server/products.server"

import mdStyles from "~/styles/markdown.css";
import styles from "~/styles/product.css";
import FooterTienda from "~/components/Footer";
import { MarkdownErrorBoundary } from "~/components/errors/Markdown";

function getFormattedPrice(price: number): string {
    if (typeof price !== 'number') {
        throw new Error('The price must be a number');
    }

    // Format the price above to USD using the locale, style, and currency.
    // let USDollar = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    // });
    let PesARG = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    });

    // return USDollar.format(price);
    // replace dot sign
    return PesARG.format(price);
}

// removes dot sign due to screen readers compatibility
// @TODO: after checking style and currency number format we need to validate if the replace applies
function accessibilityPrice(price: number): string {
    const formattedPrice = getFormattedPrice(price)
    // @TODO check if is Argentinian before replace it
    return formattedPrice.replace('.', '').replace('$', '');
}

function getButtonTextBuyNow(): string {
    return 'Agregar al carrito';
}

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: mdStyles,
    },
    {
        rel: "stylesheet",
        href: styles,
    },
];

export const loader = async ({ params }: LoaderFunctionArgs) => {
    try {
        if (!params.slug) {
            throw new Error('The slug is required');
        }

        return await getProduct(params.slug);
    } catch (error) {
        throw json("Not Found", { status: 404 });
    }
}

function ProductRoute() {
    const { title, body, preview, price, tags, images, priceHidden } = useLoaderData<Product>();

    return (
        <>
            <section className="product">
                <div className="container">
                    <nav className="navigation-back">
                        <a href="/store">
                            <span className="sr-only">Volver a la tienda</span>
                            <span aria-hidden>Volver</span>
                        </a>
                    </nav>
                    <div className="flex">
                        <div className="left">
                            <img className="image-preview" src={preview} alt="" />
                            <div className="product-images">
                                {images.map((image) => (
                                    <img key={image} src={image} alt="" />
                                ))}
                            </div>
                        </div>
                        <form className="right" method="post" action="?">
                            <div className="title">
                                <h1 itemProp="name">{title}</h1>
                            </div>
                            {!priceHidden &&
                                <p
                                    className="price h4"
                                    itemProp="offers"
                                    itemScope={false}
                                    itemType="http://schema.org/Offer"
                                >
                                    <meta itemProp="price" content="35129" />
                                    <span className="price-label">Precio:</span>{' '}
                                    <span className="sr-only">{accessibilityPrice(price)}</span>
                                    <span className="price-value" aria-hidden>
                                        {price === 0 ? "Gratis" : getFormattedPrice(price)}
                                    </span>
                                    {price > 0 && <span className="sr-only">pesos argentinos</span>}
                                </p>}
                            {!priceHidden && price > 0 &&
                                <div className="payment-options">
                                    <a href="#home">Ver formas de pago</a>
                                </div>}
                            {!priceHidden && price > 0 &&
                                <div className="quantity input">
                                    <label htmlFor="product-quantity">
                                        <span className="sr-only">Quantity</span>
                                        <span aria-hidden>Qty.</span>
                                    </label>
                                    <input id="product-quantity" name="product-quantity" type="number" defaultValue="1" />
                                </div>
                            }
                            <div className="buy">
                                <button className="button primary shadow buy-button">
                                    {!priceHidden ? getButtonTextBuyNow() : "Consultar"}
                                </button>
                            </div>
                            <div itemProp="description" className="description">
                                <div dangerouslySetInnerHTML={{ __html: body || '' }} />
                            </div>
                            {tags &&
                                <div className="tags">
                                    <span>Tags</span>
                                    <ul>
                                        {tags.map((tag) => (
                                            <li key={tag}>{tag}</li>
                                        ))}
                                    </ul>
                                </div>}
                        </form>
                    </div>
                </div>
            </section>
            <FooterTienda />
        </>
    )
}

export function ErrorBoundary() {
    return <MarkdownErrorBoundary />;
}


export default ProductRoute