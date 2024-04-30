import type { LoaderFunctionArgs, LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node";

import { getMarkdown } from "~/server/controllers/markdown.controller";
import type { MarkdownDocument } from "~/server/services/front-matter";
import styles from "~/styles/markdown.css";

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: styles,
    },
];

export const loader = async ({ params }: LoaderFunctionArgs) => {
    try {
        const slug = params.slug as string;
        return await getMarkdown('posts', slug);
    } catch (error) {
        throw json({ status: 404, message: 'Post not found' }, { status: 404 });
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
