"use client"

import { useHash } from "~/hooks/useHash";
import { Portfolio } from "~/types/portfolio";

import { PortfolioArticle } from "~/components/portfolio/portfolio-article";
import PortfolioFilter from "~/components/portfolio/portfolio-filter";
import { Container } from "~/components/ui/container/Container";
import { Grid } from "~/components/ui/grid/Grid";


export default function PortfolioArticles({ data }: { data: Portfolio[] }) {
  const hash = useHash();

  let filtered = data.filter(p => !p.draft);

  if (hash && !hash.includes('all')) {
    filtered = filtered.filter(p => p.categories.includes(hash.replace("#", "")))
  }

  filtered.sort(
    (a, b) => a.pubDate && b.pubDate ? new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf() : 0
  )

  return (
    <Container variant="fluid">
      <PortfolioFilter />
      <Grid>
        {
          filtered.map((post) => (
            <PortfolioArticle key={post.title} {...post} />
          ))
        }
      </Grid>
    </Container>
  );
}
