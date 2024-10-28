import { useActionData, useLoaderData, useLocation, useNavigation, useSearchParams } from "@remix-run/react";
import { useAtom } from "jotai";
import { ValidatedForm } from "remix-validated-form";

import { AdminCategoryActionForm, CATEGORY_PARAMS } from "~/server/controllers/categories.controller";
import { productValidator } from "~/server/zod/category.zod";
import { Category } from "~/types/global.type";

import Button from "~/components/button/Button";
import { Container } from "~/components/container/Container";
import { Fieldset } from "~/components/form/Fieldset";
import Input from "~/components/form/Input";
import InputFilePreview from "~/components/form/input-file-preview/InputFilePreview";
import { InputImageList, showUploadAtom } from "~/components/form/input-file-preview/UploadedImages";
import { Select } from "~/components/form/Select";
import ValidateInput from "~/components/form/ValidateInput";
import { Section } from "~/components/section/Section";

function getErrorText(errorMessage: string) {
    if (errorMessage.includes("duplicate key")) {
        return "Category already exist, try different slug"
    } else {
        return errorMessage;
    }
}

export default function AdminCategoryForm() {
    const [searchParams] = useSearchParams();
    const { category, categories } = useLoaderData<{ categories: Category[], category?: Category }>() as { categories: Category[], category?: Category };
    const selectedParentCategory = categories.find(c => searchParams.get(CATEGORY_PARAMS.PARENT) === c.slug);
    const actionData = useActionData<AdminCategoryActionForm>() as AdminCategoryActionForm;
    const navigation = useNavigation()
    const location = useLocation();
    const [showUploadFile] = useAtom(showUploadAtom)

    const isSubmitting = navigation.state === "submitting";
    const filteredCategories = categories.filter(c => c.slug !== category?.slug)

    return (
        <Section marginBottom>
            <Container>
                <h1 className="h1 text-2xl font-600 tracking-tight">{Boolean(category) ? 'Edit Category' : 'New Category'}</h1>
                <nav className="navigation-back">
                    <Button variant="link" asChild>
                        <a href="#" onClick={() => history.back()}>Volver</a>
                    </Button>
                </nav>
                <ValidatedForm validator={productValidator} method="post" encType="multipart/form-data">
                    {actionData?.error?.message && (
                        <div className="box paper message mt-1 bg-danger">
                            {getErrorText(actionData?.error?.message)}
                        </div>
                    )}
                    <Fieldset>
                        <Select id="parentId" name="parentId" label="Parent Category" defaultValue={category?.parentId || selectedParentCategory?._id || undefined}>
                            <option value="">No parent category</option>
                            {filteredCategories.map((parentCategory) => (
                                <option key={parentCategory._id} value={parentCategory._id}>
                                    {parentCategory.name}
                                </option>
                            ))}
                        </Select>

                        <ValidateInput name="name">
                            <Input id="name" name="name" label="Category name" placeholder="Street Art" defaultValue={category?.name} />
                        </ValidateInput>
                        {actionData?.error?.fields?.name ? (
                            <em>{actionData?.error.fields.name}</em>
                        ) : null}
                    </Fieldset>

                    <Fieldset>
                        <InputImageList source={category?.image} />
                        {showUploadFile && (<InputFilePreview id="image" name="image" label="Select image" className='mb-2' />)}
                    </Fieldset>

                    <Fieldset>
                        <input type="hidden" name="id" defaultValue={category?._id} readOnly />
                        <input type="hidden" name="_action" value={location.pathname} readOnly />
                        <Button color="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</Button>
                    </Fieldset>
                </ValidatedForm>
            </Container>
        </Section>
    );
}
