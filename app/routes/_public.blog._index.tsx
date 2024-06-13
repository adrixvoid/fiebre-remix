import { useLoaderData } from "@remix-run/react";

import { ROUTE_PATH } from "~/constants";

import { type MarkdownDocument } from "~/server/utils/front-matter";
import markdownService from "~/server/services/markdown.service";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImage, CardPadding, CardTitle } from "~/components/card/Card";

import Button from "~/components/button/Button";
import { Grid } from "~/components/grid/Grid";
import { Container } from "~/components/container/Container";

export const loader = async () => {
  const documents = await markdownService.readAllByType('blog');
  return { documents }
};

function BlogPage() {
  const { documents } = useLoaderData<typeof loader>() as { documents: MarkdownDocument[] };

  return (
    <section>
      <Container>
        <Grid>
          {documents.map((content) => (
            <article key={content.title}>
              <Card>
                <CardPadding>
                  <CardImage src={content.preview} alt={content.title} aria-hidden />
                </CardPadding>
                <CardHeader>
                  <CardTitle>{content.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum ipsa assumenda fugit, magni perspiciatis aliquam, qui reprehenderit ullam at nam nobis consequatur! Eum earum dolor assumenda! Illo suscipit ea sequi.</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button to={`${ROUTE_PATH.BLOG}/${content.slug}`}>
                    Read More...
                  </Button>
                </CardFooter>
              </Card>
            </article>
          ))}
        </Grid>
      </Container>
    </section>
  );
}

export default BlogPage;
