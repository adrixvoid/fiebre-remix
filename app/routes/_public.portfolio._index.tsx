import { useLoaderData } from "@remix-run/react";

import markdownService from "~/server/lib/markdown";

import { Card, CardContent, CardImageCover, CardTitle } from "~/components/ui/card/Card";
import { Container } from "~/components/ui/container/Container";
import { Grid } from "~/components/ui/grid/Grid";
import { Link } from "~/components/ui/link/Link";
import { Section } from "~/components/ui/section/Section";
import { ROUTE_PATH } from "~/constants";
import { Portfolio } from "~/types/portfolio";

export const loader = async () => {
  const documents = await markdownService.readAllByType<Portfolio>('portfolio');
  return { documents }
};

function PortfolioPage() {
  const { documents } = useLoaderData<typeof loader>() as { documents: Portfolio[] };

  return (
    <Section id="portfolio" marginBottom>
      <Container>
        <Grid columns="4" style={{ gap: 4 }}>
          {documents.map((content) => (
            <article key={content.title}>
              <Card style={{ overflow: "hidden", borderRadius: 'none' }}>
                <CardImageCover src={content.preview} alt={content.title} aria-hidden style={{ position: 'relative', overflow: "hidden", }}>
                  <CardContent style={{ position: 'absolute', width: "100%", bottom: 0, overflow: "hidden" }}>
                    <Link to={`${ROUTE_PATH.PORTFOLIO}/${content.slug}`}>
                      <CardTitle size='xs' style={{ color: 'hsl(var(--high-contrast))' }} >{content.title}</CardTitle>
                    </Link>
                  </CardContent>
                </CardImageCover>
              </Card>
            </article>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default PortfolioPage
