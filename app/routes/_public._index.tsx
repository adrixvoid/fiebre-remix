import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Send } from 'lucide-react';

import { ROUTE_PATH } from "~/constants";
import { Product } from "~/types/global.type";

import productModel from '~/server/schema/product.schema';

import Button from "~/components/button/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImageCover, CardTitle } from "~/components/card/Card";
import { Center } from "~/components/center/Center";
import { Container } from "~/components/container/Container";
import Input from "~/components/form/Input";
import { Grid } from "~/components/grid/Grid";
import { Section } from "~/components/section/Section";
import { Skeleton } from "~/components/skeleton/Skeleton";

export const meta: MetaFunction = () => {
  return [
    { title: "F I E B R E" },
    { name: "Fiebre", content: "Fiebre Design Studio - Buenos Aires Argentina" },
  ];
};

export const loader: LoaderFunction = async () => {
  const products = await productModel.find();
  return { products };
}

export default function Index() {
  const { products } = useLoaderData<typeof loader>() as { products: Product[]; }

  return (
    <Section>
      <div className="hero">
        <Skeleton height="70vh" style={{ maxHeight: 711, minHeight: 500 }}>
          <Container>
            <h1>Hagamos que la magia suceda!</h1>
          </Container>
        </Skeleton>
      </div>
      <Container style={{ marginTop: "2.5rem" }}>
        <Grid>
          <Card>
            <CardContent>
              <CardHeader>
                <Center>
                  <Skeleton variant="circle" width="10dvw" height="10dvw" />
                </Center>
              </CardHeader>
              <Center variant="text">
                <CardTitle>Proyectos</CardTitle>
                <CardDescription>Conocé mis servicios y hagamos realidad tu proyecto!</CardDescription>
              </Center>
              <CardFooter>
                <Center>
                  <Button>
                    Empecemos
                  </Button>
                </Center>
              </CardFooter>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardHeader>
                <Center>
                  <Skeleton variant="circle" width="10dvw" height="10dvw" />
                </Center>
              </CardHeader>
              <Center variant="text">
                <CardTitle>Cursos</CardTitle>
                <CardDescription>Plantillas que van a llevar tu negocio al siguiente nivel!</CardDescription>
              </Center>
              <CardFooter>
                <Center>
                  <Button>
                    Ver recursos
                  </Button>
                </Center>
              </CardFooter>
            </CardContent>
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
        <Grid columns="two">
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
        <Grid>
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
        <Grid>
          {products && products.map(product => {
            return (
              <article key={product.title}>
                <Card>
                  <CardImageCover src={product.images?.[0].url}>
                    <img src={product.images?.[0].url} alt={product.title} aria-hidden />
                  </CardImageCover>
                  <CardContent>
                    <CardHeader>
                      <CardTitle>{product.title}</CardTitle>
                    </CardHeader>
                    <CardDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum ipsa assumenda fugit, magni perspiciatis aliquam, qui reprehenderit ullam at nam nobis consequatur! Eum earum dolor assumenda! Illo suscipit ea sequi.</CardDescription>
                    <CardFooter>
                      <Button to={`${ROUTE_PATH.SHOP_DETAIL}/${product.slug}`}>
                        Read More...
                      </Button>
                    </CardFooter>
                  </CardContent>
                </Card>
              </article>
            )
          })}
        </Grid>
      </Container>
      <Skeleton height="30dvh" style={{ marginTop: "2.5rem", minHeight: "500px" }}>
        <Container>
          <Center direction="column" variant="all">
            <div style={{ maxWidth: "40dvw" }}>
              <h2 style={{ textAlign: "center" }}>Suscribíte para obtener descuentos únicos y plantillas gratuitas!</h2>
            </div>
            <Center direction="row" variant="flex" style={{ borderRadius: "var(--radius)", padding: "0 1rem", width: "50dvw", fontSize: "2rem", lineHeight: "2.5rem", height: "auto", backgroundColor: "color-mix(in hsl, hsl(var(--background)), transparent 5%)" }}>
              <Input name="subscribe" placeholder="your@email.com" style={{ border: 0, padding: "1rem 0", width: "50dvw", fontSize: "2rem", lineHeight: "2.5rem", height: "auto", backgroundColor: "transparent", boxShadow: "none!important" }} />
              <Button variant="primary"><Send strokeWidth={1.5} /> Subscribe!</Button>
            </Center>
          </Center>
        </Container>
      </Skeleton>
    </Section>
  );
}
