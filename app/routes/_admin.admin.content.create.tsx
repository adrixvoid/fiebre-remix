import { Form, useNavigation } from "@remix-run/react";
import { type LoaderFunction, type ActionFunction } from "@remix-run/node";

import { MARKDOWN_TYPE } from "~/constants";

import { contentAction, contentLoader } from "~/server/controllers/content.controller";
import Button from "~/components/button/Button";
import InputFilePreview from "~/components/form/input-file-preview/InputFilePreview";
import { Container } from "~/components/container/Container";

export const action: ActionFunction = contentAction;

export const loader: LoaderFunction = contentLoader;

export default function UploadContent() {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting";

    return (
        <Container>
            <h1>New Content</h1>
            <Form method="post" encType="multipart/form-data">
                <fieldset>
                    <label htmlFor="type">
                        Content Type
                    </label>
                    <select id="type" name="type">
                        {Object.keys(MARKDOWN_TYPE).map((key) => (
                            <option key={key} value={key}>
                                {MARKDOWN_TYPE[key as keyof typeof MARKDOWN_TYPE]}
                            </option>
                        ))}
                    </select>
                </fieldset>
                <hr />
                <fieldset>
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" placeholder="Noche de Reyes" />

                    <label htmlFor="body">
                        Description
                    </label>
                    <textarea id="body" name="body" rows={5} className="mb-1" />
                </fieldset>
                <hr />
                <fieldset>

                    <label htmlFor="categories">
                        Tags
                    </label>
                    <input id="tags" name="tags" placeholder="illustration, sunset, beer" />

                    <label htmlFor="slug">Post Slug</label>
                    <input id="slug" name="slug" placeholder="noche-de-reyes" />
                </fieldset>
                <hr />
                <fieldset>
                    <InputFilePreview id="images" name="images" label='Add images' multiple={true} />
                </fieldset>
                <hr />
                <fieldset>
                    <div className="block">
                        <label htmlFor="markdown">
                            <input id="markdown" name="markdown" type="checkbox" defaultChecked={true} className="mr-2" />
                            Save as markdown file
                        </label>
                    </div>

                    <div className="block">
                        <label htmlFor="draft">
                            <input id="draft" name="draft" type="checkbox" defaultChecked={true} className="mr-2" />
                            Save as draft
                        </label>
                    </div>
                </fieldset>

                <div>
                    <Button color="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Please Wait..." : "Save markdown"}</Button>
                </div>
            </Form>
        </Container>
    );
}
