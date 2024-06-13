import type { LoaderFunction, LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { MarkdownPage } from "~/components/markdown/Markdown";

import markdownService from "~/server/services/markdown.service";

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
