import { Form } from "@remix-run/react";
import { type ActionFunction, type LinksFunction, redirect } from "@remix-run/node";

import { createContent } from "~/server/markdown.server";

import styles from "~/styles/upload-content.css";
import FilePreview from "../components/form/file/FilePreview";
import { uploadFilesAction } from "~/server/upload.server";
import { getDirectoryFromType, type ContentType } from "~/server/utils/front-matter.server";

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

    const directory = await getDirectoryFromType(type as ContentType);

    const imagesResult = uploadFilesAction(request, directory);

    console.log("imagesResult", imagesResult)

    createContent({ type, slug, title, body, categories, preview });

    return redirect("/upload");
};

export default function UploadContent() {
    console.log("RENDER")
    return (
        <div className="container">
            <h1>Upload Content</h1>
            <Form method="post">
                <label htmlFor="type">
                    Type
                </label>
                <select id="type" name="type">
                    <option value="blog">Blog</option>
                    <option value="posts">Post</option>
                    <option value="pages">Page</option>
                    <option value="products">Products</option>
                </select>

                <label htmlFor="title">Title</label>
                <input id="title" name="title" placeholder="Noche de Reyes" />
                <label htmlFor="slug">
                    Post Slug
                </label>
                <input id="slug" name="slug" placeholder="noche-de-reyes" />
                <label htmlFor="body">
                    Description
                </label>
                <textarea id="body" name="body" rows={5} />

                <label htmlFor="categories">
                    Categories
                </label>
                <input id="categories" name="categories" placeholder="category1, category2" />

                <FilePreview id="file" name="file" />

                <div>
                    <input className="button primary" type="submit" value="Save markdown" />
                </div>
            </Form>
        </div>
    );
}
