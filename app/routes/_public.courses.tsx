import { json } from "@remix-run/node";
import { Send } from "lucide-react";

import markdownService from "~/server/services/markdown.service";

import Button from "~/components/ui/button/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardPadding, CardTitle } from "~/components/ui/card/Card";
import { Center } from "~/components/ui/center/Center";
import { Container } from "~/components/ui/container/Container";
import { Flex } from "~/components/ui/flex/Flex";
import Input from "~/components/ui/form/Input";
import { Section } from "~/components/ui/section/Section";
import { Skeleton } from "~/components/ui/skeleton/Skeleton";


export const loader = async () => {
    const markdownResult = await markdownService.readOneByType('pages', '2023-12-04-about');

    if (!markdownResult) {
        return json("Not Found", { status: 404 });
    }

    return { content: markdownResult };
}

export default function CoursesPage() {
    return (
        <Section>
            <Skeleton style={{ height: "45dvh", minHeight: "500px", maxHeight: "711px" }}>
                <Container>
                    <Center variant="all">
                        <h1>Hagamos que la magia suceda!</h1>
                    </Center>
                </Container>
            </Skeleton>
            <Container style={{ marginTop: "4rem" }}>
                <Flex justify="center" style={{ gap: "10dvh" }}>
                    <Card style={{ maxWidth: "20rem" }}>
                        <CardHeader>
                            <Center>
                                <Skeleton variant="circle" width="10dvw" height="10dvw" />
                            </Center>
                        </CardHeader>
                        <CardContent>
                            <CardPadding>
                                <Center variant="text">
                                    <CardTitle>Diseño gráfico para e-commerce</CardTitle>
                                </Center>
                            </CardPadding>
                            <Center variant="text">
                                <CardDescription>En este curso vas a aprender a diseñar tu página web y tus redes sociales a través de los fundamos del diseño gráfico.</CardDescription>
                            </Center>
                            <hr />
                            <Center>
                                8hs | 9 Módulos | mp/tar
                            </Center>
                            <hr />
                            <Center variant="text">
                                <div>USD $50</div>
                            </Center>
                        </CardContent>
                        <CardFooter>
                            <Flex justify='around' style={{ gap: "0.5rem" }}>
                                <Button>
                                    Empecemos
                                </Button>
                                <Button>
                                    Más Info
                                </Button>
                            </Flex>
                        </CardFooter>
                    </Card>
                    <Card style={{ maxWidth: "20rem" }}>
                        <CardHeader>
                            <Center>
                                <Skeleton variant="circle" width="10dvw" height="10dvw" />
                            </Center>
                        </CardHeader>
                        <CardContent>
                            <CardPadding>
                                <Center variant="text">
                                    <CardTitle>Diseño gráfico para e-commerce</CardTitle>
                                </Center>
                            </CardPadding>
                            <Center variant="text">
                                <CardDescription>En este curso vas a aprender a diseñar tu página web y tus redes sociales a través de los fundamos del diseño gráfico.</CardDescription>
                            </Center>
                            <hr />
                            <Center>
                                8hs | 9 Módulos | mp/tar
                            </Center>
                            <hr />
                            <Center variant="text">
                                <div>USD $50</div>
                            </Center>
                        </CardContent>
                        <CardFooter>
                            <Flex justify='around' style={{ gap: "0.5rem" }}>
                                <Button>
                                    Empecemos
                                </Button>
                                <Button>
                                    Más Info
                                </Button>
                            </Flex>
                        </CardFooter>
                    </Card>
                </Flex>
            </Container>
            <Skeleton height="30dvh" style={{ marginTop: "2.5rem", minHeight: "500px" }}>
                <Container>
                    <Center direction="column" variant="all">
                        <div style={{ maxWidth: "40dvw" }}>
                            <h2 style={{ textAlign: "center" }}>Suscribíte para obtener descuentos únicos y plantillas gratuitas!</h2>
                        </div>
                        <Center direction="row" variant="flex" style={{ borderRadius: "var(--radius)", padding: "0 1rem", width: "50dvw", fontSize: "2rem", lineHeight: "2.5rem", height: "auto", backgroundColor: "color-mix(in hsl, hsl(var(--background)), transparent 5%)" }}>
                            <Input name="subscribe" placeholder="your@email.com" style={{ border: 0, padding: "1rem 0", width: "50dvw", fontSize: "2rem", lineHeight: "2.5rem", height: "auto", backgroundColor: "transparent" }} />
                            <Button variant="primary"><Send strokeWidth={1.5} /> Subscribe!</Button>
                        </Center>
                    </Center>
                </Container>
            </Skeleton>
        </Section>
    )
}
