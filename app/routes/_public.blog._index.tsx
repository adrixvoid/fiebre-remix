import { useLoaderData } from "@remix-run/react";

import { ROUTE_PATH } from "~/constants";

import markdownService from "~/server/lib/markdown";

import { Card, CardContent, CardDescription, CardHeader, CardImageCover, CardPadding, CardTitle } from "~/components/ui/card/Card";
import { Container } from "~/components/ui/container/Container";
import { Grid } from "~/components/ui/grid/Grid";
import { Link } from "~/components/ui/link/Link";
import { Section } from "~/components/ui/section/Section";
import { Post } from "~/types/post";

export const loader = async () => {
  const documents = await markdownService.readAllByType<Post>('blog');
  return { documents }
};

function BlogPage() {
  const { documents } = useLoaderData<typeof loader>() as { documents: Post[] };

  return (
    <Section marginBottom>
      <Container>
        <Grid>
          {documents.map((content) => (
            <Card as="article" key={content.title}>
              <CardPadding>
                <Link to={`${ROUTE_PATH.BLOG}/${content.slug}`}>
                  <CardImageCover src={content.preview} />
                </Link>
              </CardPadding>
              <CardHeader>
                <Link to={`${ROUTE_PATH.BLOG}/${content.slug}`}>
                  <CardTitle>{content.title}</CardTitle>
                </Link>
              </CardHeader>
              <CardContent>
                <CardDescription>{content.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default BlogPage;
