import { useRouteError, isRouteErrorResponse, useLoaderData } from "@remix-run/react"
import type { MarkdownDocument } from "~/server/utils/front-matter";

import styles from './Markdown.module.css'

export function MarkdownSection({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.section}>
      {children}
    </div>
  );
}

export function MarkdownList({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.list}>
      {children}
    </div>
  );
}

export function MarkdownPage() {
  const { content } = useLoaderData<{ content: MarkdownDocument }>() as { content: MarkdownDocument };
  return (
    <div>
      <div className="container">
        <h1 className={styles.title}>{content.title}</h1>
        {content.preview && (
          <div className={styles.preview} style={{ backgroundImage: `url('${content.preview}')` }} />
        )}
      </div>
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
          <div className="container">
            <p>You don't have access to this page.</p>
          </div>
        );
      case 404:
        return <div className="container">Markdown not found!</div>;
    }

    return (
      <div className="container">
        Something went wrong: {error.status}{" "}
        {error.statusText}
      </div>
    );
  }

  return (
    <div className="container">
      <h1>0__x We could not load the page</h1>
    </div>
  );
}