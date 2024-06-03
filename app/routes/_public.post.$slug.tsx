import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import markdownService from "~/server/services/markdown.service";
import type { MarkdownDocument } from "~/server/utils/front-matter";
import styles from "~/styles/markdown.css";
import { MarkdownPage } from "~/components/markdown/MarkdownTemplate";

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: styles,
    },
];

export const loader: LoaderFunction = async ({ params }) => {
    try {
        const slug = params.slug as string;
        const content = await markdownService.read('posts', slug);
        return json({ content }, { status: 200 })
    } catch (error) {
        throw json({ message: 'Not found' }, { status: 404 });
    }
}

export default MarkdownPage
