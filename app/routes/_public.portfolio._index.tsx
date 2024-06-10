import { useLoaderData } from "@remix-run/react";

import { getDocuments, MarkdownDocument } from "~/server/utils/front-matter";
import { MarkdownList, MarkdownSection } from "~/components/markdown/Markdown";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImage, CardTitle } from "~/components/card/Card";
import Button from "~/components/button/Button";
import { ROUTE_PATH } from "~/constants";

export const loader = async () => {
  const documents = await getDocuments('portfolio');
  return { documents };
};

function Portfolio() {
  const { documents } = useLoaderData<typeof loader>() as { documents: MarkdownDocument[] };

  return (
    <MarkdownSection>
      <div className="container">
        <MarkdownList>
          {documents.map((content) => (
            <article key={content.title}>
              <Card>
                <CardImage src={content.preview} alt={content.title} aria-hidden />
                <CardHeader>
                  <CardTitle>{content.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum ipsa assumenda fugit, magni perspiciatis aliquam, qui reprehenderit ullam at nam nobis consequatur! Eum earum dolor assumenda! Illo suscipit ea sequi.</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button to={`${ROUTE_PATH.PORTFOLIO}/${content.slug}`}>
                    Read More...
                  </Button>
                </CardFooter>
              </Card>
            </article>
          ))}
        </MarkdownList>
      </div>
    </MarkdownSection>
  );
}

export default Portfolio
