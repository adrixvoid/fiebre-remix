import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import markdownService from "~/server/services/markdown.service";
import markdownStyles from "~/styles/markdown.css";
import MarkdownPage from "./_public.post.$slug";

export const loader = async () => {
    try {
        const markdownResult = await markdownService.read('pages', '2023-12-04-about');
        return { content: markdownResult };
    } catch (error) {
        throw json("Not Found", { status: 404 });
    }
}

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: markdownStyles,
    },
];


export default MarkdownPage
