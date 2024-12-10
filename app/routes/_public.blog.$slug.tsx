import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import markdownService from "~/server/lib/markdown";

import { MarkdownErrorBoundary, MarkdownPage } from "~/components/markdown/Markdown";

export const loader: LoaderFunction = async ({ params }) => {
    try {
        const slug = params.slug as string;
        const content = await markdownService.readOneByType('blog', slug);
        return json({ content }, { status: 200 })
    } catch (error) {
        throw json({ message: 'Blog not found' }, { status: 404 });
    }
}

export default MarkdownPage

export const ErrorBoundary = MarkdownErrorBoundary;