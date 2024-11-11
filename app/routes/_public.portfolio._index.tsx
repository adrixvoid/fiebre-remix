import { useLoaderData } from "@remix-run/react";

import { MarkdownDocument } from "~/server/lib/front-matter";
import markdownService from "~/server/lib/markdown";

import Button from "~/components/ui/button/Button";
import { Card, CardFooter, CardHeader, CardImageCover, CardPadding, CardTitle } from "~/components/ui/card/Card";
import { Container } from "~/components/ui/container/Container";
import { Grid } from "~/components/ui/grid/Grid";
import { Section } from "~/components/ui/section/Section";
import { ROUTE_PATH } from "~/constants";

export const loader = async () => {
  const documents = await markdownService.readAllByType('portfolio');
  return { documents }
};

function PortfolioPage() {
  const { documents } = useLoaderData<typeof loader>() as { documents: MarkdownDocument[] };

  return (
    <Section id="portfolio" marginBottom>
      <Container>
        <Grid columns={4}>
          {documents.map((content) => (
            <article key={content.title}>
              <Card>
                <CardPadding>
                  <CardImageCover src={content.preview} alt={content.title} aria-hidden />
                </CardPadding>
                <CardHeader>
                  <CardTitle>{content.title}</CardTitle>
                </CardHeader>
                <CardPadding></CardPadding>
                <CardFooter>
                  <Button to={`${ROUTE_PATH.PORTFOLIO}/${content.slug}`}>
                    More...
                  </Button>
                </CardFooter>
              </Card>
            </article>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default PortfolioPage
