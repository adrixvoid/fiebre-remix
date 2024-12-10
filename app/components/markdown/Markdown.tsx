import { isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import type { MarkdownDocument } from "~/server/lib/front-matter";

import { Container } from "~/components/ui/container/Container";
import { Section } from "~/components/ui/section/Section";

import { Title } from "../ui/text/Text";
import styles from "./Markdown.module.css";

export function Markdown({ body, ...props }: React.HTMLAttributes<HTMLDivElement> & { body: string }) {
  return (
    <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: body || '' }} />
  )
}

export function MarkdownPage() {
  const { content } = useLoaderData<{ content: MarkdownDocument }>() as { content: MarkdownDocument };
  return (
    <Section marginBottom>
      <Container>
        <Title size="xl" className={styles.title}>{content.title}</Title>
        {/* {content.preview && (
          <div className={styles.preview} style={{ backgroundImage: `url('${content.preview}')` }} />
        )} */}
      </Container>
      <Markdown body={content.body} />
    </Section>
  )
}

export function MarkdownErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 401:
        return (
          <Container>
            <p>You don't have access to this page.</p>
          </Container>
        );
      case 404:
        return <Container>Markdown not found!</Container>;
    }

    return (
      <Container>
        Something went wrong: {error.status}{" "}
        {error.statusText}
      </Container>
    );
  }

  return (
    <Container>
      <h1>0__x We could not load the page</h1>
    </Container>
  );
}