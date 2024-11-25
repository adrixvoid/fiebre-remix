import { type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { useActionData, useLoaderData, useLocation, useSearchParams } from "@remix-run/react";
import { useForm } from "@rvf/remix";

import Button from "~/components/ui/button/Button";
import { Container } from "~/components/ui/container/Container";
import { Fieldset } from "~/components/ui/form/Fieldset";
import { FormBlock } from "~/components/ui/form/FormBlock";
import Input from "~/components/ui/form/Input";
import InputFilePreview from "~/components/ui/form/input-file-preview/InputFilePreview";
import { InputImageList } from "~/components/ui/form/input-file-preview/UploadedImages";
import { InputSubmit } from "~/components/ui/form/InputSubmit";
import { Select } from "~/components/ui/form/Select";
import { Section } from "~/components/ui/section/Section";

import { actionAdminCategoriesForm, CATEGORY_PARAMS, loaderAdminCategoriesForm } from "~/server/controllers/categories.controller";
import { categoryValidator } from "~/server/zod/category.zod";

import { Alert } from "~/components/ui/alert/Alert";
import { ROUTE_PATH_ADMIN } from "~/constants";
import useReferrer from "~/hooks/useReferrer";
import { Category } from "~/types/category";
import { MapImage } from "~/types/file";

export const loader: LoaderFunction = loaderAdminCategoriesForm;
export const action: ActionFunction = actionAdminCategoriesForm;

function getErrorText(errorMessage: string) {
  if (errorMessage.includes("duplicate key")) {
    return "Category already exist, try different slug"
  } else {
    return errorMessage;
  }
}

export default function AdminCategoryForm() {
  const data = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  const referrer = useReferrer({ defaultReferrer: ROUTE_PATH_ADMIN.CATEGORY_LIST });
  const { category, categories } = useLoaderData<{ categories: Category[], category?: Category }>() as { categories: Category[], category?: Category };
  const selectedParentCategory = categories.find(c => searchParams.get(CATEGORY_PARAMS.PARENT) === c.slug);
  const location = useLocation();

  const filteredCategories = categories.filter(c => c.slug !== category?.slug)

  const form = useForm({
    method: 'post',
    encType: "multipart/form-data",
    validator: categoryValidator,
    defaultValues: {
      id: category?.id || null,
      name: category?.name || "",
      image: null,
      parentId: category?.parentId || selectedParentCategory?.id || null,
      active: null,
      imageToDelete: null,
      referrer: null,
    }
  });

  return (
    <Section marginBottom>
      <Container>
        <h1 className="h1 text-2xl font-600 tracking-tight">{Boolean(category) ? 'Edit Category' : 'New Category'}</h1>
        <nav className="navigation-back">
          <Button variant="link" asChild>
            <a href="#" onClick={() => history.back()}>Volver</a>
          </Button>
        </nav>
        <form {...form.getFormProps()}>
          {data?.error?.message && (
            <Alert variant="danger" onClose={() => console.log('Alert closed')}>
              {getErrorText(data?.error?.message)}
            </Alert>
          )}
          <Fieldset>
            <FormBlock>
              <Select name="parentId" label="Parent Category" {...form.getInputProps("parentId")} error={form.error("parentId")}>
                <option value="">No parent category</option>
                {filteredCategories.map((parentCategory) => (
                  <option key={parentCategory.id} value={parentCategory.id}>
                    {parentCategory.name}
                  </option>
                ))}
              </Select>
            </FormBlock>

            <FormBlock>
              <Input id="name" name="name" label="Category name" placeholder="Street Art" defaultValue={category?.name} error={form.error("name")} />
            </FormBlock>
          </Fieldset>

          <Fieldset>
            <FormBlock>
              <InputImageList source={category?.image as MapImage}>
                <InputFilePreview type="file" id="image" name="image" label="Image" accept="image/*" multiple={false} error={form.error("image")} />
              </InputImageList>
            </FormBlock>
          </Fieldset>

          <Fieldset>
            <input type="hidden" name="state" value={JSON.stringify(location.state) || ""} />
            <input type="hidden" name="referrer" value={referrer} />
            <input type="hidden" name="id" value={category?.id} readOnly />
            <input type="hidden" name="_action" value={location.pathname} readOnly />
            <InputSubmit label="Save" isSubmitting={form.formState.isSubmitting} />
          </Fieldset>
        </form>
      </Container>
    </Section>
  );
}
