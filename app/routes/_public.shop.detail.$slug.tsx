import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData, useRouteError } from "@remix-run/react"
import { json } from "@remix-run/node";
import productModel from '~/server/schema/product.schema';

import type { MapImage, Product } from "~/types/global.type";

import { parse } from '~/server/utils/marked';

import { ProductButtonAddToCart, ProductDescription, ProductGallery, ProductGrid, ProductImagePreview, ProductPrice, ProductQuantity, ProductTags, ProductTitle } from "~/components/products/detail/ProductDetail";
import { Container } from "~/components/container/Container";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    try {
        if (!params.slug) {
            throw new Error('The slug is required');
        }

        const product = await productModel.findOne({ slug: params.slug }).exec();


        if (!product) {
            throw new Error('Product not found');
        }

        const gallery: MapImage[] = product && product.images ? [...product.images] : [];
        if (gallery.length > 1) {
            gallery.shift()
        }

        product.description = await parse(product.description || '');

        return { product, gallery };
    } catch (error) {
        console.log(error);
        throw json({ success: false, message: "Product not Found" }, { status: 404 });
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

function ProductPage() {
    const fetcher = useFetcher({ key: "add-to-bag" });
    const { product, gallery } = useLoaderData<typeof loader>() as { product: Product, gallery: MapImage[] };
    const { title, description, priceInCents, tags, images, priceHidden } = product;

    return (
        <section id="product-detail">
            <Container>

                <ProductGrid>
                    <div>
                        <ProductImagePreview src={images?.[0].url} />
                        <ProductGallery images={gallery} />
                    </div>
                    <div>
                        <ProductTitle title={title} />
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
                                <ProductButtonAddToCart priceHidden={priceHidden} />
                            </fetcher.Form>
                        </div>
                        {description && <ProductDescription description={description} />}
                        {tags && <ProductTags tags={tags} />}
                    </div>
                </ProductGrid>
            </Container>
        </section>
    )
}

export default ProductPage
