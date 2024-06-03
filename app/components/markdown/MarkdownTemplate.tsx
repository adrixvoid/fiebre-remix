import { useLoaderData } from "@remix-run/react"
import type { MarkdownDocument } from "~/server/utils/front-matter";

export function MarkdownMainTemplate({ title, body, preview }: MarkdownDocument) {
  return (
    <div className="post">
      <h1 className="text-5xl lg:text-6xl leading-tight max-w-3xl tracking-tight my-16 text-center mx-auto">{title}</h1>
      {preview &&
        <div className="bg-contain bg-no-repeat bg-center h-[60dvh] w-[75dvw] mx-auto" style={{ backgroundImage: `url('${preview}')` }}>
        </div>}
      <div className="markdown-content" dangerouslySetInnerHTML={{ __html: body || '' }} />
    </div >
  )
}

export function MarkdownPage() {
  const { content } = useLoaderData<{ content: MarkdownDocument }>() as { content: MarkdownDocument };
  return <MarkdownMainTemplate {...content} />
}
