import { useRouteError, isRouteErrorResponse } from "@remix-run/react"

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