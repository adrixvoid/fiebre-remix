import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import markdownService from "~/server/services/markdown.service";
import { MarkdownPage } from "~/components/markdown/Markdown";

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const content = await markdownService.read(url.pathname);

    if (!content) {
        return json({ message: 'Not found' }, { status: 404 });
    }

    return json({ content }, { status: 200 })
}

export default MarkdownPage
