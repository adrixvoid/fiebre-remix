import { useLoaderData } from "@remix-run/react";

import Button from "~/components/ui/button/Button";
import { Card, CardPadding } from "~/components/ui/card/Card";
import { Container } from "~/components/ui/container/Container";
import { Flex } from "~/components/ui/flex/Flex";
import { Section } from "~/components/ui/section/Section";

// import { getCart } from "~/server/shoppingCart.server"
// import type { Product } from "~/server/products.service"


export const loader = async () => {
    // return getCart()
    return { products: [] };
}

const Cart = () => {
    const { products } = useLoaderData<typeof loader>();
    return (
        <Section id="shopping-cart" marginBottom>
            <Container>
                <div style={{ marginBottom: "2.5rem" }}>
                    <h1 style={{ marginBottom: 0 }}>Your Cart</h1>
                    <p style={{ marginTop: 0 }}>You have 2 items in your cart</p>
                </div>
                <div>
                    <Card>
                        <CardPadding>
                            <Flex justify="between" align="center">
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
                            <Flex justify="between" align="center">
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
        </Section>
    )
}

export default Cart