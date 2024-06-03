import type { LoaderFunction, LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import markdownService from "~/server/services/markdown.service";
import styles from "~/styles/markdown.css";
import MarkdownPage from "./_public.post.$slug";

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: styles,
    },
];

export const loader: LoaderFunction = async ({ params }) => {
    try {
        const slug = params.slug as string;
        const content = await markdownService.read('blog', slug);
        return json({ content }, { status: 200 })
    } catch (error) {
        throw json({ message: 'Blog not found' }, { status: 404 });
    }
}

export default MarkdownPage
