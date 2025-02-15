import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Send } from 'lucide-react';

import { ROUTE_PATH } from "~/constants";
import { Product } from "~/types/product";


import Button from "~/components/ui/button/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImageCover, CardPadding, CardTitle } from "~/components/ui/card/Card";
import { Center } from "~/components/ui/center/Center";
import { Container } from "~/components/ui/container/Container";
import Input from "~/components/ui/form/Input";
import { Grid } from "~/components/ui/grid/Grid";
import { Link } from "~/components/ui/link/Link";
import { Section } from "~/components/ui/section/Section";
import { Skeleton } from "~/components/ui/skeleton/Skeleton";
import { Text } from "~/components/ui/text/Text";
import { productService } from "~/server/services/products.service";

export const meta: MetaFunction = () => {
  return [
    { title: "F I E B R E" },
    { name: "Fiebre", content: "Fiebre Design Studio - Buenos Aires Argentina" },
  ];
};

export const loader: LoaderFunction = async () => {
  const products = await productService.findMany();
  return { products };
}

export default function Index() {
  const { products } = useLoaderData<typeof loader>() as { products: Product[]; }

  return (
    <Section>
      <div className="background-gradients">

      </div>
      <div className="hero">
        <Center variant="all" style={{ height: "70vh", maxHeight: 711, minHeight: 500 }}>
          <Container>
            <h1>Hagamos que la magia suceda!</h1>
          </Container>
        </Center>
      </div>
      <Container style={{ marginTop: "2.5rem" }}>
        <Grid>
          <Card>
            <CardHeader>
              <Center>
                <Skeleton variant="circle" width="10dvw" height="10dvw" />
              </Center>
            </CardHeader>
            <CardContent>
              <Center variant="text">
                <CardTitle>Proyectos</CardTitle>
                <CardDescription>Conocé mis servicios y hagamos realidad tu proyecto!</CardDescription>
              </Center>
            </CardContent>
            <CardFooter>
              <Center>
                <Button>
                  Empecemos
                </Button>
              </Center>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <Center>
                <Skeleton variant="circle" width="10dvw" height="10dvw" />
              </Center>
            </CardHeader>
            <CardContent>
              <Center variant="text">
                <CardTitle>Cursos</CardTitle>
                <CardDescription>Plantillas que van a llevar tu negocio al siguiente nivel!</CardDescription>
              </Center>
            </CardContent>
            <CardFooter>
              <Center>
                <Button>
                  Ver recursos
                </Button>
              </Center>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <Center>
                <Skeleton variant="circle" width="10dvw" height="10dvw" />
              </Center>
            </CardHeader>
            <CardContent>
              <Center variant="text">
                <CardTitle>Plantillas gratis</CardTitle>
                <CardDescription>Remeras, bolsos, stickers y mucho más!</CardDescription>
              </Center>
            </CardContent>
            <CardFooter>
              <Center>
                <Button>
                  Ver tienda
                </Button>
              </Center>
            </CardFooter>
          </Card>
        </Grid>
      </Container>
      <Container style={{ marginTop: "2.5rem" }}>
        <Grid columns="2">
          <Skeleton width="100%" height={535} />
          <CardContent>
            <CardTitle>Curso de diseño gráfico para  emprendedoras</CardTitle>
            <CardDescription>Dominá los conceptos y herramientas de diseño para conectar con tu público.</CardDescription>
            <Button>
              Ver temario
            </Button>
          </CardContent>
          <CardContent>
            <CardTitle>Curso de diseño gráfico para  emprendedoras</CardTitle>
            <CardDescription>Dominá los conceptos y herramientas de diseño para conectar con tu público.</CardDescription>
            <Button>
              Ver temario
            </Button>
          </CardContent>
          <Skeleton width="100%" height={535} />
        </Grid>
      </Container>
      <Container style={{ marginTop: "2.5rem" }}>
        <Center variant="all" style={{ height: "10rem" }}>
          <h2>Proyectos destacados</h2>
        </Center>
        <Grid columns='3'>
          <Skeleton width="100%" height={320} />
          <Skeleton width="100%" height={320} />
          <Skeleton width="100%" height={320} />
          <Skeleton width="100%" height={320} />
          <Skeleton width="100%" height={320} />
          <Skeleton width="100%" height={320} />
        </Grid>
        <Center style={{ marginTop: "2.5rem" }}>
          <Button size="lg" style={{ width: "20rem" }}>Ver más</Button>
        </Center>
      </Container>
      <Container style={{ marginTop: "2.5rem" }}>
        <Grid columns="4">
          {products && products.map(product => {
            return (
              <Card as="article" key={product.name} border>
                {product.images?.[0] &&
                  <CardPadding>
                    <Link to={`${ROUTE_PATH.SHOP_DETAIL}/${product.slug}`}>
                      <CardImageCover src={product.images?.[0].url} />
                    </Link>
                  </CardPadding>
                }
                <CardContent>
                  <Link to={`${ROUTE_PATH.SHOP_DETAIL}/${product.slug}`}>
                    <CardTitle size='sm'>{product.name}</CardTitle>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </Grid>
      </Container>
      <Skeleton height="30dvh" style={{ marginTop: "2.5rem", minHeight: "200px" }}>
        <Container>
          <Center direction="column" variant="all">
            <Center variant="text" style={{ maxWidth: "700px" }}>
              <Text variant="muted">Suscribite y obtené descuentos únicos y plantillas gratuitas!</Text>
            </Center>
            <Center direction="row" variant="flex" style={{ borderRadius: "var(--radius)", padding: "0 1rem", width: "50dvw", fontSize: "2rem", lineHeight: "2.5rem", height: "auto", backgroundColor: "color-mix(in hsl, hsl(var(--background)), transparent 5%)" }}>
              <Input name="subscribe" placeholder="your@email.com" style={{ border: 0, padding: "1rem 0", width: "50dvw", fontSize: "1.2rem", lineHeight: "1.5rem", height: "auto", backgroundColor: "transparent", boxShadow: "none!important" }} />
              <Button><Send strokeWidth={1.5} /> Suscribirme</Button>
            </Center>
          </Center>
        </Container>
      </Skeleton>
    </Section>
  );
}
