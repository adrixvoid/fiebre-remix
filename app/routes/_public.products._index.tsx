import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { productService } from "~/server/services/products.service"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImage, CardTitle } from "~/components/card/Card";
import type { Product } from "~/types/global.type"

import { ROUTE_PATH } from "~/constants";

import Button from "~/components/button/Button";
import { ProductList } from "~/components/products/Product";

export const loader: LoaderFunction = async () => {
    const products = await productService.find();
    return { products };
}

const Store = () => {
    const { products } = useLoaderData<{ products: Product[] }>() as { products: Product[] };
    return (
        <section>
            <div className="container">
                <ProductList>
                    {products.map((product) => (
                        <article key={product.title}>
                            <Card>
                                <CardImage src={product.images?.[0]?.url} alt={product.title} aria-hidden loading="lazy" />
                                <CardHeader>
                                    <CardTitle>{product.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="item-description">
                                    <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo sint expedita modi doloremque at quisquam, dolore corporis ea. Laboriosam sint natus neque vel dolorem expedita repellendus, in iusto iste nostrum?</CardDescription>
                                </CardContent>
                                <CardFooter>
                                    <Button to={`${ROUTE_PATH.PRODUCT}/${product.slug}`}>
                                        More Details
                                    </Button>
                                </CardFooter>
                            </Card>
                        </article>
                    ))}
                </ProductList>
            </div>
        </section>
    )
}

export default Store