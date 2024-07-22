import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { ROUTE_PATH } from "~/constants";
import type { Product } from "~/types/global.type";

import { productService } from "~/server/services/products.service";

import Button from "~/components/button/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImageCover, CardTitle } from "~/components/card/Card";
import { Container } from "~/components/container/Container";
import { Section } from "~/components/section/Section";
import { ProductList } from "~/modules/products/Product";

export const loader: LoaderFunction = async () => {
    const products = await productService.find();
    return { products };
}

const Store = () => {
    const { products } = useLoaderData<{ products: Product[] }>() as { products: Product[] };
    return (
        <Section marginBottom>
            <Container>
                <ProductList>
                    {products.map((product) => (
                        <article key={product.title}>
                            <Card>
                                <CardImageCover src={product.images?.[0]?.url}>
                                    <img src={product.images?.[0]?.url} alt={product.title} aria-hidden loading="lazy" />
                                </CardImageCover>
                                <CardContent>
                                    <CardHeader>
                                        <CardTitle>{product.title}</CardTitle>
                                    </CardHeader>
                                    <div className="item-description">
                                        <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo sint expedita modi doloremque at quisquam, dolore corporis ea. Laboriosam sint natus neque vel dolorem expedita repellendus, in iusto iste nostrum?</CardDescription>
                                    </div>
                                    <CardFooter>
                                        <Button to={`${ROUTE_PATH.SHOP_DETAIL}/${product.slug}`}>
                                            More Details
                                        </Button>
                                    </CardFooter>
                                </CardContent>
                            </Card>
                        </article>
                    ))}
                </ProductList>
            </Container>
        </Section>
    )
}

export default Store