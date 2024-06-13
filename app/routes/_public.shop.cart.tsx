import type { LinksFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Button from "~/components/button/Button";
import { Card, CardContent, CardPadding } from "~/components/card/Card";
import { Container } from "~/components/container/Container";
import { Flex } from "~/components/flex/Flex";

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
        <section id="shopping-cart">
            <Container>
                <div style={{ marginBottom: "2.5rem" }}>
                    <h1 style={{ marginBottom: 0 }}>Your Cart</h1>
                    <p style={{ marginTop: 0 }}>You have 2 items in your cart</p>
                </div>
                <div>
                    <Card>
                        <CardPadding>
                            <Flex justify="between">
                                <div style={{ width: "5rem" }}><img src="http://localhost:3004/products/91a539f7-d122-4da4-a37f-511ba5a758a1-8.jpg" /></div>
                                <div>Ilustración básica</div>
                                <div>1</div>
                                <div>
                                    <div>$100,00</div>
                                    <Button variant="link">Remove</Button>
                                </div>
                            </Flex>
                        </CardPadding>
                    </Card>
                    <hr />
                    <Card>
                        <CardPadding>
                            <Flex justify="between">
                                <div style={{ width: "5rem" }}><img src="http://localhost:3004/products/91a539f7-d122-4da4-a37f-511ba5a758a1-8.jpg" /></div>
                                <div>Ilustración básica                                </div>
                                <div>1</div>
                                <div>
                                    <div>$50,00</div>
                                    <Button variant="link">Remove</Button>
                                </div>
                            </Flex>
                        </CardPadding>
                    </Card>
                </div>
                <Flex style={{ marginTop: "2.5rem" }}>
                    <Flex>
                        <div>
                            <div>Order Sub-Total</div>
                            <div>2 Items</div>
                        </div>
                        <div>
                            $150,00
                        </div>
                    </Flex>
                    <Button variant="primary">Checkout</Button>
                </Flex>
            </Container>
        </section>
    )
}

export default Cart