import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import markdownService from "~/server/services/markdown.service";

import { MarkdownPage } from "~/modules/markdown/Markdown";

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
