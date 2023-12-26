import type { LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node";

import { getContent } from "~/server/markdown.server";
import type { MarkdownDocument } from "~/server/utils/front-matter.server";
import { MarkdownErrorBoundary } from "~/components/errors/Markdown";
import postStyles from "~/styles/markdown.css";
import styles from "~/styles/about.css";

export const loader = async () => {
    try {
        const markdownResult = await getContent('pages', '2023-12-04-about');
        return markdownResult;
    } catch (error) {
        throw json("Not Found", { status: 404 });
    }
}

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: styles,
    },
    {
        rel: "stylesheet",
        href: postStyles,
    },
];


export default function AboutPage() {
    const { title, body } = useLoaderData<MarkdownDocument>();

    return (
        <div className="about post">
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
