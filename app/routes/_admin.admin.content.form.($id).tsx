import { type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { useLoaderData, useLocation, useNavigation } from "@remix-run/react";
import { ValidatedForm } from "remix-validated-form";

import { MARKDOWN_TYPE } from "~/constants";
import useReferrer from "~/hooks/useReferrer";

import { contentAction, contentLoader } from "~/server/controllers/content.controller";
import { formValidator } from "~/server/zod/content.zod";

import Button from "~/components/button/Button";
import { Container } from "~/components/container/Container";
import { Fieldset } from "~/components/form/Fieldset";
import { FormBlock } from "~/components/form/FormBlock";
import Input from "~/components/form/Input";
import InputFilePreview from "~/components/form/input-file-preview/InputFilePreview";
import InputImageList from "~/components/form/input-file-preview/UploadedImages";
import { Select } from "~/components/form/Select";
import TextEditor from "~/components/form/text-editor/TextEditor";
import ValidateInput from "~/components/form/ValidateInput";
import { Section } from "~/components/section/Section";


export const loader: LoaderFunction = contentLoader;
export const action: ActionFunction = contentAction;

export default function UploadContent() {
    const { content } = useLoaderData<typeof loader>();
    const referrer = useReferrer();
    const location = useLocation();
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting";

    return (
        <Section marginBottom>
            <Container>
                <h1>New Content</h1>
                <ValidatedForm
                    validator={formValidator}
                    method="post"
                    encType="multipart/form-data"
                >
                    <Fieldset>
                        <label htmlFor="type">
                            Content Type
                        </label>
                        <Select id="type" name="type">
                            {Object.keys(MARKDOWN_TYPE).map((key) => (
                                <option key={key} value={key}>
                                    {MARKDOWN_TYPE[key as keyof typeof MARKDOWN_TYPE]}
                                </option>
                            ))}
                        </Select>
                    </Fieldset>
                    <hr />
                    <Fieldset>
                        <FormBlock>
                            <ValidateInput name="title">
                                <Input label="Title" id="title" name="title" placeholder="Noche de Reyes" />
                            </ValidateInput>
                        </FormBlock>

                        <TextEditor label='Description' id="description" name="description" rows={5} defaultValue={content?.description} />
                    </Fieldset>
                    <hr />
                    <Fieldset>
                        <FormBlock>
                            <Input type="text" label='Tags' key="tags" id="tags" name="tags" placeholder="illustration, sunset, beer" defaultValue={content?.tags} />
                        </FormBlock>
                        <Input type="text" label='Slug' key="slug" id="slug" name="slug" placeholder="my-custom-slug-for-SEO" defaultValue={content?.slug} />
                    </Fieldset>
                    <hr />
                    <Fieldset>
                        <div className="mt-6">
                            <ValidateInput name='toDelete' className='mb-2'>
                                <InputImageList source={content?.preview} />
                            </ValidateInput>
                            <ValidateInput type="file" name="preview" label="Preview" className='mb-2'>
                                <InputFilePreview id="preview" name="preview" label='Add preview' />
                            </ValidateInput>
                        </div>
                    </Fieldset>
                    <hr />
                    <Fieldset className="mt-4">
                        <Input label="Save as markdown file" id="markdown" name="markdown" type="checkbox" defaultChecked={true} className="mr-2" />
                        <FormBlock>
                            <Input type="checkbox" label="Save as draft" id="draft" name="draft" defaultChecked={true} />
                        </FormBlock>
                    </Fieldset>

                    <div>
                        <input type="hidden" name="state" value={JSON.stringify(location.state) || ""} />
                        <input type="hidden" name="referrer" value={referrer} />
                        <Button color="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Please Wait..." : "Save markdown"}</Button>
                    </div>
                </ValidatedForm>
            </Container>
        </Section>
    );
}
