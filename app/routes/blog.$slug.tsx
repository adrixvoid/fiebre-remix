import type { LoaderFunctionArgs, LinksFunction } from "@remix-run/node";
import { useLoaderData, useRouteError, isRouteErrorResponse } from "@remix-run/react"
import { json } from "@remix-run/node";

import styles from "~/styles/post.css";
import { getContent } from "~/server/markdown.server";
import type { MarkdownDocument } from "~/server/markdown.server";

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: styles,
    },
];

export const loader = async ({ params }: LoaderFunctionArgs) => {
    try {
        const slug = params.slug as string;
        const markdownResult = await getContent('blog', slug);

        if (!markdownResult) {
            return json({ status: 404, message: 'Page not found' }, { status: 404 });
        }

        return markdownResult;
    } catch (error) {
        return json({ status: 500, message: 'Internal Server Error' }, { status: 500 });
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
