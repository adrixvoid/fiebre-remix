import { useRouteError, isRouteErrorResponse } from "@remix-run/react"

export function MarkdownErrorBoundary() {
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