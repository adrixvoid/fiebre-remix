import { Form, useActionData, useLoaderData, useLocation, useNavigation, useSearchParams } from "@remix-run/react";
import cx from "clsx";

import InputFilePreview from "~/components/form/input-file-preview/InputFilePreview";
import Button from "~/components/button/Button";
import UploadedImages from "~/components/form/input-file-preview/UploadedImages";

import { Category } from "~/types/global.type";
import { AdminCategoryActionForm, CATEGORY_PARAMS } from "~/server/controllers/categories.controller";

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


    const isSubmitting = navigation.state === "submitting";
    const filteredCategories = categories.filter(c => c.slug !== category?.slug)

    return (
        <div className="container">
            <h1 className="h1 text-2xl font-600 tracking-tight">{Boolean(category) ? 'Edit Category' : 'New Category'}</h1>
            <nav className="navigation-back">
                <a href="#" onClick={() => history.back()}>Volver</a>
            </nav>
            <Form method="post" encType="multipart/form-data">
                {actionData?.error?.message && (
                    <div className="box paper message mt-1 bg-danger">
                        {getErrorText(actionData?.error?.message)}
                    </div>
                )}
                <fieldset>
                    <label htmlFor="type">
                        Parent Category
                    </label>
                    <select id="parentId" name="parentId" defaultValue={category?.parentId || selectedParentCategory?._id || undefined}>
                        <option value="">No parent category</option>
                        {filteredCategories.map((parentCategory) => (
                            <option key={parentCategory._id} value={parentCategory._id}>
                                {parentCategory.name}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="name">Category name</label>
                    <input id="name" name="name" placeholder="Street Art" defaultValue={category?.name} />
                    {actionData?.error?.fields?.name ? (
                        <em>{actionData?.error.fields.name}</em>
                    ) : null}
                </fieldset>

                <fieldset>
                    <UploadedImages id="image" name="image" label="Select image" className='mb-2' source={category?.image} />
                </fieldset>

                <fieldset>
                    <input type="hidden" name="id" defaultValue={category?._id} readOnly />
                    <input type="hidden" name="_action" value={location.pathname} readOnly />
                    <Button color="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</Button>
                </fieldset>
            </Form>
        </div>
    );
}
