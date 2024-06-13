import { useLoaderData, useLocation, useNavigation } from "@remix-run/react";
import { type LoaderFunction, type ActionFunction } from "@remix-run/node";

import { MARKDOWN_TYPE } from "~/constants";

import { contentAction, contentLoader } from "~/server/controllers/content.controller";
import { formValidator } from "~/server/zod/content.zod";
import Button from "~/components/button/Button";
import InputFilePreview from "~/components/form/input-file-preview/InputFilePreview";
import { Container } from "~/components/container/Container";
import ValidateInput from "~/components/form/ValidateInput";
import Input from "~/components/form/Input";
import TextEditor from "~/components/form/text-editor/TextEditor";
import InputImageList from "~/components/form/input-file-preview/UploadedImages";
import useReferrer from "~/hooks/useReferrer";
import { ValidatedForm } from "remix-validated-form";


export const loader: LoaderFunction = contentLoader;
export const action: ActionFunction = contentAction;

export default function UploadContent() {
    const { content } = useLoaderData<typeof loader>();
    const referrer = useReferrer();
    const location = useLocation();
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting";

    return (
        <Container>
            <h1>New Content</h1>
            <ValidatedForm
                validator={formValidator}
                method="post"
                encType="multipart/form-data"
            >
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
                    <ValidateInput name="title">
                        <Input label="Title" id="title" name="title" placeholder="Noche de Reyes" />
                    </ValidateInput>

                    <TextEditor label='Description' id="description" name="description" rows={5} defaultValue={content?.description} />
                </fieldset>
                <hr />
                <fieldset className="mt-4">
                    <div className="mt-6">
                        <Input type="text" label='Tags' key="tags" id="tags" name="tags" placeholder="illustration, sunset, beer" defaultValue={content?.tags} />
                    </div>
                    <div className="mt-6">
                        <Input type="text" label='Slug' key="slug" id="slug" name="slug" placeholder="my-custom-slug-for-SEO" defaultValue={content?.slug} />
                    </div>
                </fieldset>
                <hr />
                <fieldset>
                    <div className="mt-6">
                        <ValidateInput name='toDelete' className='mb-2'>
                            <InputImageList source={content?.preview} />
                        </ValidateInput>
                        <ValidateInput type="file" name="preview" label="Preview" className='mb-2'>
                            <InputFilePreview id="preview" name="preview" label='Add preview' />
                        </ValidateInput>
                    </div>
                </fieldset>
                <hr className="mt-8" />
                <fieldset className="mt-4">
                    <div className="block">
                        <Input label="Save as markdown file" id="markdown" name="markdown" type="checkbox" defaultChecked={true} className="mr-2" />
                    </div>
                    <div className="inline-block">
                        <Input type="checkbox" label="Save as draft" id="draft" name="draft" defaultChecked={true} />
                    </div>
                </fieldset>

                <div>
                    <input type="hidden" name="state" value={JSON.stringify(location.state) || ""} />
                    <input type="hidden" name="referrer" value={referrer} />
                    <Button color="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Please Wait..." : "Save markdown"}</Button>
                </div>
            </ValidatedForm>
        </Container>
    );
}
