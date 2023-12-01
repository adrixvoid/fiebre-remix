import type { LoaderFunctionArgs, LinksFunction } from "@remix-run/node";
import { useLoaderData, useRouteError, isRouteErrorResponse } from "@remix-run/react"
import { json } from "@remix-run/node";

import styles from "~/styles/post.css";
import { getBlog } from "~/server/markdown.server";
import type { Post } from "~/server/markdown.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    if (!params.slug) {
        throw json("Not Found", { status: 404 });
    }

    const post = await getBlog(params.slug)

    if (!post) {
        throw json(
            { id: params.slug },
            { status: 404 }
        );
    }

    return post
}

export default function Post() {
    const { title, content } = useLoaderData<Post>();

    return (
        <div className="post">
            <div className="container">
                <div className="post-header">
                    <h1 className="sr-only">{title}</h1>
                </div>
            </div>
            <div className="container">
                <div className="post-content">
                    <div dangerouslySetInnerHTML={{ __html: content || '' }} />
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
                        <p>You don't have access to this post.</p>
                    </div>
                );
            case 404:
                return <div>Post not found!</div>;
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

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: styles,
    },
];
