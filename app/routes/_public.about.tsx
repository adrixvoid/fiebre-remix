import { json } from "@remix-run/node";

import markdownService from "~/server/services/markdown.service";
import MarkdownPage from "./_public.portfolio.$slug";

export const loader = async () => {
    const markdownResult = await markdownService.readType('pages', '2023-12-04-about');

    if (!markdownResult) {
        return json("Not Found", { status: 404 });
    }

    return { content: markdownResult };
}


export default MarkdownPage
