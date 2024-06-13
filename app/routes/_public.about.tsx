import { json } from "@remix-run/node";
import { MarkdownPage } from "~/components/markdown/Markdown";

import markdownService from "~/server/services/markdown.service";

export const loader = async () => {
    const markdownResult = await markdownService.readOneByType('pages', '2023-12-04-about');

    if (!markdownResult) {
        return json("Not Found", { status: 404 });
    }

    return { content: markdownResult };
}


export default MarkdownPage;
