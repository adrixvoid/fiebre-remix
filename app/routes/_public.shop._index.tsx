import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { ROUTE_PATH } from "~/constants";
import type { Product } from "~/types/global.type";

import { productService } from "~/server/services/products.service";

import { ProductList } from "~/components/products/Product";
import Button from "~/components/ui/button/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImageCover, CardTitle } from "~/components/ui/card/Card";
import { Container } from "~/components/ui/container/Container";
import { Section } from "~/components/ui/section/Section";

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
                        <Card as="article" key={product.title}>
                            <CardImageCover src={product.images?.[0]?.url}>
                                <img src={product.images?.[0]?.url} alt={product.title} aria-hidden loading="lazy" />
                            </CardImageCover>
                            <CardHeader>
                                <CardTitle>{product.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo sint expedita modi doloremque at quisquam, dolore corporis ea. Laboriosam sint natus neque vel dolorem expedita repellendus, in iusto iste nostrum?</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Button to={`${ROUTE_PATH.SHOP_DETAIL}/${product.slug}`}>
                                    More Details
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </ProductList>
            </Container>
        </Section>
    )
}

export default Store