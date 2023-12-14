import type { LinksFunction } from "@remix-run/node";
import { useLoaderData, useRouteError, isRouteErrorResponse } from "@remix-run/react"
import { json } from "@remix-run/node";

import postsStyles from "~/styles/post.css";
import styles from "~/styles/about.css";
import { getContent } from "~/server/markdown.server";
import type { MarkdownDocument } from "~/server/markdown.server";

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
        href: postsStyles,
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
                <div className="post-content">
                    <div dangerouslySetInnerHTML={{ __html: body || '' }} />
                </div>
            </div>
        </div>
    )
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        switch (error.status) {
            case 401:
                return (
                    <div>
                        <p>You don't have access to this page.</p>
                    </div>
                );
            case 404:
                return <div>Page not found!</div>;
        }

        return (
            <div>
                Something went wrong: {error.status}{" "}
                {error.statusText}
            </div>
        );
    }

    return (
        <div>
            Something went wrong:{" "}
            "Unknown Error"
        </div>
    );
}
