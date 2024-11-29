import { useLoaderData } from "@remix-run/react";

import markdownService from "~/server/lib/markdown";

import { A11yText } from "~/components/ui/a11y/A11yText";
import { Card, CardImage } from "~/components/ui/card/Card";
import { Container } from "~/components/ui/container/Container";
import { MasonryGrid } from "~/components/ui/grid/MasonryGrid";
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
        <MasonryGrid columns={4}>
          {documents.map((content) => (
            <article key={content.title}>
              <Link to={`${ROUTE_PATH.PORTFOLIO}/${content.slug}`}>
                <Card style={{ display: 'flex' }}>
                  <A11yText srOnly={content.title} />
                  <CardImage src={content.preview} alt={content.title} aria-hidden />
                </Card>
              </Link>
            </article>
          ))}
        </MasonryGrid>
      </Container>
    </Section>
  );
}

export default PortfolioPage
