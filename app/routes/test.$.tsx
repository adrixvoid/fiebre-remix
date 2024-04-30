import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node"

export const loader = async ({ params }: LoaderFunctionArgs) => {
    // const categoryParam = new URL(request.url).searchParams.get('category');
    console.log('params', params);

    return null;
}

export default function Posts() {

    return (
        <section className="markdown">
            <div className="container">
                <div className="markdown-list">
                    TEST
                </div>
            </div>
        </section>
    );
}
