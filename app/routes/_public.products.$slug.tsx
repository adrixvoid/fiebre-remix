import type { LoaderFunctionArgs, ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, useRouteError } from "@remix-run/react"
import { json } from "@remix-run/node";

import { getProduct } from "~/server/services/products.service"
import type { Product } from "~/types/global.type";

import mdStyles from "~/styles/markdown.css";
import styles from "~/styles/product.css";
import FooterTienda from "~/components/Footer";
import Button from "~/components/button/Button";
import { getFormattedPrice, accessibilityPrice } from "~/i18n/money";
import { t } from "~/i18n/translate";

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

        const product = await getProduct(params.slug);

        console.log('product', product)

        return product;
    } catch (error) {
        console.log(error);
        throw json("Not Found", { status: 404 });
    }
}

export async function action({ request }: ActionFunctionArgs) {
    console.log("PRODUCT ACTION", request)
    let formData = await request.formData();
    let values = Object.fromEntries(formData);
    console.log(values)

    // const docs = await shoppingCartAction(request);

    // console.log({ docs })

    // basket?.action?.addItem({
    //     id: values.id,
    //     quantity: values.quantity,
    // });

    // const errors = await validateRecipeFormData(formData);
    // if (errors) {
    //     return json({ errors });
    // }

    // fetcher.load("/api/cart");
    // fetcher.formAction("/api/cart");
    // fetcher.submit(
    //     { serialized: "values" },
    //     { method: "POST" }
    //   );

    return json({ ok: true });
};

function ProductRoute() {
    const { title, body, preview, priceInCents, tags, images, priceHidden } = useLoaderData<Product>() as Product;
    const fetcher = useFetcher({ key: "add-to-bag" });

    return (
        <>
            <section className="product">
                <div className="container">
                    <nav className="navigation-back">
                        <a href="/products">
                            <span className="sr-only">Volver a la tienda</span>
                            <span aria-hidden>Volver</span>
                        </a>
                    </nav>
                    <div className="flex">
                        <div className="left">
                            <div className="image-preview">
                                <img src={images?.[0].fileName} alt={title} />
                            </div>
                            <div className="product-images">
                                {images?.map((image) => (
                                    <img key={image.fileName} src={image.url} alt={title} />
                                ))}
                            </div>
                        </div>
                        <div className="right">
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
                                    <span className="sr-only">{accessibilityPrice(priceInCents)}</span>
                                    <span className="price-value" aria-hidden>
                                        {priceInCents === 0 ? "Gratis" : getFormattedPrice(priceInCents)}
                                    </span>
                                    {priceInCents > 0 && <span className="sr-only">pesos argentinos</span>}
                                </p>}
                            {!priceHidden && priceInCents > 0 &&
                                <div className="payment-options">
                                    <a href="#home">Ver formas de pago</a>
                                </div>}
                            <div className="right">
                                <fetcher.Form method="post">
                                    {!priceHidden && priceInCents > 0 &&
                                        <div className="quantity input">
                                            <label htmlFor="product-quantity">
                                                <span className="sr-only">Quantity</span>
                                                <span className="product-quantity-label" aria-hidden>Qty.</span>
                                            </label>
                                            <input id="product-quantity" name="product-quantity" type="number" defaultValue="1" />
                                        </div>
                                    }
                                    <div className="buy">
                                        <Button color="primary" className="buy-button">
                                            {!priceHidden ? t("ADD_TO_CART") : t("INQUIRE")}
                                        </Button>
                                    </div>
                                </fetcher.Form>
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
                        </div>
                    </div>
                </div>
            </section>
            <FooterTienda />
        </>
    )
}

export default ProductRoute
