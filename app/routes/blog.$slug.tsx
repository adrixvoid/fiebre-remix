import type { LoaderFunctionArgs, LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node";

import { getContent } from "~/server/markdown.server";
import type { MarkdownDocument } from "~/server/utils/front-matter.server";
import { MarkdownErrorBoundary } from "~/components/errors/Markdown";
import styles from "~/styles/post.css";

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: styles,
    },
];

export const loader = async ({ params }: LoaderFunctionArgs) => {
    try {
        const slug = params.slug as string;
        return await getContent('blog', slug);
    } catch (error) {
        throw json({ status: 404, message: 'Page not found' }, { status: 404 });
    }
}

export default function Post() {
    const { title, body } = useLoaderData<MarkdownDocument>();

    return (
        <div className="post">
            <div className="container">
                <div className="post-header">
                    <h1 className="sr-only">{title}</h1>
                </div>
            </div>
            <div className="container">
                <div className="markdown-content">
                    <div dangerouslySetInnerHTML={{ __html: body || '' }} />
                </div>
            </div>
        </div>
    )
}

export function ErrorBoundary() {
    return <MarkdownErrorBoundary />
}
