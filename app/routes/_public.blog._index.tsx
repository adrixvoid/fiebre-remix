import { useLoaderData } from "@remix-run/react";

import { ROUTE_PATH } from "~/constants";

import markdownService from "~/server/services/markdown.service";
import { type MarkdownDocument } from "~/server/utils/front-matter";

import Button from "~/components/ui/button/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImageCover, CardPadding, CardTitle } from "~/components/ui/card/Card";
import { Container } from "~/components/ui/container/Container";
import { Grid } from "~/components/ui/grid/Grid";
import { Section } from "~/components/ui/section/Section";

export const loader = async () => {
  const documents = await markdownService.readAllByType('blog');
  return { documents }
};

function BlogPage() {
  const { documents } = useLoaderData<typeof loader>() as { documents: MarkdownDocument[] };

  return (
    <Section marginBottom>
      <Container>
        <Grid>
          {documents.map((content) => (
            <Card as="article" key={content.title}>
              <CardPadding>
                <CardImageCover src={content.preview}>
                  <img src={content.preview} alt={content.title} aria-hidden />
                </CardImageCover>
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
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default BlogPage;
