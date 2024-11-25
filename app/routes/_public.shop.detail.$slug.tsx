import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";

import { ROUTE_PATH } from "~/constants";
import type { MapImage } from "~/types/file";
import type { Product } from "~/types/product";

import { parse } from '~/lib/marked';

import { ProductButtonAddToCart, ProductDescription, ProductGallery, ProductGrid, ProductImagePreview, ProductPrice, ProductQuantity, ProductTags, ProductTitle } from "~/components/products/detail/ProductDetail";
import { Container } from "~/components/ui/container/Container";
import { Section } from "~/components/ui/section/Section";
import { productService } from "~/server/services/products.service";

const ACTIONS = {
    ADD_TO_CART: "add-to-cart"
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
    try {
        if (!params.slug) {
            throw new Error('The slug is required');
        }

        const product = await productService.findWhere({ slug: params.slug });

        const gallery: MapImage[] = product && product.images ? [...product.images as Product['images']] : [];
        if (gallery.length > 1) {
            gallery.shift()
        }

        product.description = await parse(product.description as Product['description'] || '');

        return { product, gallery };
    } catch (error) {
        console.error("SHOP-DETAIL", error.message);
        throw json({ success: false, message: "Product not Found" }, { status: 404 });
    }
}

export async function action({ request }: ActionFunctionArgs) {
    let formData = await request.formData();
    let data = Object.fromEntries(formData);

    if (data.action === ACTIONS.ADD_TO_CART) {
        return redirect(ROUTE_PATH.SHOPPING_CART);
    }

    // const docs = await shoppingCartAction(request);

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

function ProductPage() {
    const fetcher = useFetcher({ key: "add-to-bag" });
    const { product, gallery } = useLoaderData<typeof loader>() as { product: Product, gallery: MapImage[] };
    const { name, description, priceInCents, tags, images, priceHidden } = product;

    return (
        <Section id="product-detail" marginBottom>
            <Container>
                <ProductGrid>
                    {images?.[0] &&
                        <div>
                            <ProductImagePreview src={images?.[0].url} />
                            <ProductGallery images={gallery} />
                        </div>
                    }
                    <div>
                        <ProductTitle title={name} />
                        {!priceHidden && <ProductPrice priceInCents={priceInCents} />}
                        {!priceHidden && priceInCents > 0 &&
                            <div className="payment-options">
                                <a href="#home">Ver formas de pago</a>
                            </div>}
                        <div>
                            <fetcher.Form method="post">
                                {!priceHidden && priceInCents > 0 &&
                                    <ProductQuantity />
                                }
                                <ProductButtonAddToCart name="action" value={ACTIONS.ADD_TO_CART} priceHidden={priceHidden} />
                            </fetcher.Form>
                        </div>
                        {description && <ProductDescription description={description} />}
                        {tags && <ProductTags tags={tags} />}
                    </div>
                </ProductGrid>
            </Container>
        </Section>
    )
}

export default ProductPage
