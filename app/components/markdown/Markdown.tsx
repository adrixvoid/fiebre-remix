import { useRouteError, isRouteErrorResponse, useLoaderData } from "@remix-run/react"
import type { MarkdownDocument } from "~/server/utils/front-matter";

import styles from './Markdown.module.css'
import { Container } from "../container/Container";

export function MarkdownPage() {
  const { content } = useLoaderData<{ content: MarkdownDocument }>() as { content: MarkdownDocument };
  return (
    <div>
      <Container>
        <h1 className={styles.title}>{content.title}</h1>
        {content.preview && (
          <div className={styles.preview} style={{ backgroundImage: `url('${content.preview}')` }} />
        )}
      </Container>
      <div className={styles['markdown-content']} dangerouslySetInnerHTML={{ __html: content.body || '' }} />
    </div>
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