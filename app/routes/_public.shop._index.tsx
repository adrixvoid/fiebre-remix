import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { ROUTE_PATH } from "~/constants";
import type { Product } from "~/types/product";

import { productService } from "~/server/services/products.service";

import Button from "~/components/ui/button/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImageCover, CardTitle } from "~/components/ui/card/Card";
import { Container } from "~/components/ui/container/Container";
import { Grid } from "~/components/ui/grid/Grid";
import { Link } from "~/components/ui/link/Link";
import { Money } from "~/components/ui/money/Money";
import { Section } from "~/components/ui/section/Section";

export const loader: LoaderFunction = async () => {
    const products = await productService.findMany();
    return { products };
}

const Store = () => {
    const { products } = useLoaderData<{ products: Product[] }>() as { products: Product[] };
    return (
        <Section marginBottom>
            <Container>
                <Grid columns='4'>
                    {products.map((product) => (
                        <Card as="article" key={product.name}>
                            <CardImageCover src={product.images?.[0]?.url}>
                                <img src={product.images?.[0]?.url} alt={product.name} aria-hidden loading="lazy" />
                            </CardImageCover>
                            <CardHeader>
                                <Link to={`${ROUTE_PATH.SHOP_DETAIL}/${product.slug}`}>
                                    <CardTitle size='sm'>{product.name}</CardTitle>
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    <Money priceInCents={product.priceInCents} />
                                </CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Button to={`${ROUTE_PATH.SHOP_DETAIL}/${product.slug}`}>
                                    See product
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </Grid>
            </Container>
        </Section>
    )
}

export default Store