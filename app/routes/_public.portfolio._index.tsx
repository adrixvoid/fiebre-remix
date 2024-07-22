import { useLoaderData } from "@remix-run/react";

import markdownService from "~/server/services/markdown.service";
import { MarkdownDocument } from "~/server/utils/front-matter";

import Button from "~/components/button/Button";
import { Card, CardContent, CardHeader, CardImageCover, CardPadding, CardTitle } from "~/components/card/Card";
import { Container } from "~/components/container/Container";
import { Grid } from "~/components/grid/Grid";
import { Section } from "~/components/section/Section";
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
        <Grid>
          {documents.map((content) => (
            <article key={content.title}>
              <Card>
                <CardPadding>
                  <CardImageCover src={content.preview} alt={content.title} aria-hidden />
                </CardPadding>
                <CardContent>
                  <CardHeader>
                    <CardTitle>{content.title}</CardTitle>
                  </CardHeader>
                  <Button to={`${ROUTE_PATH.PORTFOLIO}/${content.slug}`}>
                    More...
                  </Button>
                </CardContent>
              </Card>
            </article>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default PortfolioPage
