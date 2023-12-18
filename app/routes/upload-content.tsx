import { Form } from "@remix-run/react";
import { type ActionFunction, type LinksFunction, redirect } from "@remix-run/node";

import styles from "~/styles/upload-content.css";
import { createContent } from "~/server/markdown.server";

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: styles,
    },
];

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const body = formData.get("body") as string;
    const type = formData.get("type") as string;
    const categories = formData.get("categories") as string;
    const preview = formData.get("preview") as string;

    console.log({ title, slug, body, type, categories, preview })

    createContent({ type, slug, title, body, categories, preview });

    return redirect("/upload-content");
};

export default function UploadContent() {
    return (
        <div className="container">
            <h1>Upload Content</h1>
            <Form method="post">
                <label>Title</label>
                <input name="title" placeholder="Noche de Reyes" />
                <label htmlFor="slug">
                    Post Slug
                </label>
                <input name="slug" placeholder="noche-de-reyes" />
                <label htmlFor="body">
                    Description
                </label>
                <textarea name="body" rows={20} />
                <label htmlFor="type">
                    Type
                </label>
                <select name="type" id="type">
                    <option value="blog">Blog</option>
                    <option value="posts">Post</option>
                    <option value="pages">Page</option>
                    <option value="products">Products</option>
                </select>

                <label htmlFor="categories">
                    Categories
                </label>
                <input name="categories" placeholder="category1, category2" />

                <label htmlFor="preview">
                    Preview
                </label>
                <input name="preview" type="file" />

                <div>
                    <button type="submit">Save markdown</button>
                </div>
            </Form>
        </div>
    );
}
