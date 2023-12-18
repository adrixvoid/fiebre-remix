import type { LoaderFunction, LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node";

import { getContent } from "~/server/markdown.server";
import type { MarkdownDocument } from "~/server/utils/front-matter.server";
import { MarkdownErrorBoundary } from "~/components/errors/Markdown";
import styles from "~/styles/markdown.css";

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: styles,
    },
];

export const loader: LoaderFunction = async ({ params }) => {
    try {
        const slug = params.slug as string;
        return await getContent('blog', slug);
    } catch (error) {
        throw json({ status: 404, message: 'Page not found' }, { status: 404 });
    }
}

export default function Post() {
    const { title, preview, body } = useLoaderData<MarkdownDocument>();

    return (
        <div className="post">
            <div className="container">
                <div className="markdown-content">
                    <div className="post-header">
                        <h1>{title}</h1>
                    </div>
                    <div className="post-preview">
                        <img src={preview} alt={title} aria-hidden />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: body || '' }} />
                </div>
            </div>
        </div>
    )
}

export function ErrorBoundary() {
    return <MarkdownErrorBoundary />
}
