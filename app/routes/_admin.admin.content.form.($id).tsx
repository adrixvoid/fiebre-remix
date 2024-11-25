import { type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { useLoaderData, useLocation, useNavigation } from "@remix-run/react";

import { MARKDOWN_TYPE } from "~/constants";
import useReferrer from "~/hooks/useReferrer";

import { contentAction, contentLoader } from "~/server/controllers/content.controller";
import { formValidator } from "~/server/zod/content.zod";

import { useForm } from "@rvf/remix";
import Button from "~/components/ui/button/Button";
import { Container } from "~/components/ui/container/Container";
import { Fieldset } from "~/components/ui/form/Fieldset";
import { FormBlock } from "~/components/ui/form/FormBlock";
import Input from "~/components/ui/form/Input";
import InputFilePreview from "~/components/ui/form/input-file-preview/InputFilePreview";
import InputImageList from "~/components/ui/form/input-file-preview/UploadedImages";
import { Select } from "~/components/ui/form/Select";
import TextEditor from "~/components/ui/form/text-editor/TextEditor";
import { Section } from "~/components/ui/section/Section";


export const loader: LoaderFunction = contentLoader;
export const action: ActionFunction = contentAction;

export default function UploadContent() {
    const { content } = useLoaderData<typeof loader>();
    const referrer = useReferrer();
    const location = useLocation();
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting";

    const form = useForm({
        method: 'post',
        encType: "multipart/form-data",
        validator: formValidator,
        defaultValues: {
            ...content,
            name: content?.name || "",
        }
    });

    return (
        <Section marginBottom>
            <Container>
                <h1>New Content</h1>
                <form {...form.getFormProps()}>
                    <Fieldset>
                        <FormBlock>
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
                        </FormBlock>
                    </Fieldset>
                    <hr />
                    <Fieldset>
                        <FormBlock>
                            <Input label="Title" id="title" name="title" placeholder="Noche de Reyes" />
                        </FormBlock>
                        <FormBlock>
                            <TextEditor label='Description' id="description" name="description" rows={5} defaultValue={content?.description} />
                        </FormBlock>
                    </Fieldset>
                    <hr />
                    <Fieldset>
                        <FormBlock>
                            <Input type="text" label='Tags' key="tags" id="tags" name="tags" placeholder="illustration, sunset, beer" defaultValue={content?.tags} />
                        </FormBlock>
                        <FormBlock>
                            <Input type="text" label='Slug' key="slug" id="slug" name="slug" placeholder="my-custom-slug-for-SEO" defaultValue={content?.slug} />
                        </FormBlock>
                    </Fieldset>
                    <hr />
                    <Fieldset>
                        <div className="mt-6">
                            <FormBlock>
                                <InputImageList name='toDelete' source={content?.preview}>
                                    <InputFilePreview type="file" id="preview" name="preview" label='Add preview' />
                                </InputImageList>
                            </FormBlock>
                        </div>
                    </Fieldset>
                    <hr />
                    <Fieldset className="mt-4">
                        <FormBlock>
                            <Input label="Save as markdown file" id="markdown" name="markdown" type="checkbox" defaultChecked={true} className="mr-2" />
                            <Input type="checkbox" label="Save as draft" id="draft" name="draft" defaultChecked={true} />
                        </FormBlock>
                    </Fieldset>

                    <div>
                        <input type="hidden" name="state" value={JSON.stringify(location.state) || ""} />
                        <input type="hidden" name="referrer" value={referrer} />
                        <Button color="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Please Wait..." : "Save markdown"}</Button>
                    </div>
                </form>
            </Container>
        </Section>
    );
}
