import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { type ActionFunction, type LinksFunction, redirect, NodeOnDiskFile } from "@remix-run/node";
import { Fragment } from "react";
import { atom, useAtom } from 'jotai'

import { createContent, type MarkdownPost } from "~/server/controllers/markdown.controller";
import { mapFile, uploadFilesAction } from "~/server/controllers/upload.controller";
import { productService } from '~/server/models/products.model'
import InputFilePreview from "~/components/form/file/InputFilePreview";
import { FilePreview } from "~/components/form/file/InputFilePreview.type";
import Button from "~/components/button/Button";
import { slugify } from "~/utils/url"
import useToggle from "~/hooks/useToggle"
import { ASSET_PATH, MARKDOWN_TYPES } from "~/constants";
import styles from "~/styles/admin-content.css";
import { Category } from "~/types/global.type";
import { categoryService } from "~/server/models/categories.model";
import { CategoriesCheckbox } from "~/components/form/checkbox/CheckboxCategory";
import cx from "classnames";

const imagesAtom = atom(false);
const productAtom = atom(false);
const modalCategory = atom(false);

const DialogDataList = ({ categories }: { categories: Category[] }) => {
  const [isModalCategoryOpen, setModalCategoryOpen] = useAtom(modalCategory)

  function handleModalCategory(event: React.MouseEvent | React.KeyboardEvent) {
    event.preventDefault();
    setModalCategoryOpen(!isModalCategoryOpen)
  }

  function generateCategoriesCheckbox(categories: Category[], isSubcategory: boolean = false): JSX.Element[] {
    return categories.map(category => (
      <div key={`chkbox-${category._id}`} className={cx({ "checkbox-subitems": isSubcategory, "checkbox-items": !isSubcategory })}>
        <div className={cx({ "ml-3": isSubcategory })}>
          <CategoriesCheckbox
            name='category[]'
            value={category.path}
            label={category.path.split('/').join(' / ')}
          />
          {category.subcategories.length > 0 && generateCategoriesCheckbox(category.subcategories, true)}
        </div>
      </div>
    ))
  }

  const generateDataListOption = (categories: Category[], parent?: Category): React.ReactNode => (
    categories.map(category => (
      <>
        <option key={`product-datalist-${category._id}`} value={parent ? category.path.split('/').join(' / ') : category.name} />
        {category?.subcategories?.length > 0 && generateDataListOption(category.subcategories, category)}
      </>
    ))
  );

  return <>
    <Button type="button" onClick={handleModalCategory}>Add Category</Button>
    <div id="dialog_layer" className="dialogs">
      <dialog open={isModalCategoryOpen}>
        <h2 id="dialog1_label" className="dialog_label">Categories</h2>

        <label htmlFor="categories">
          Categories
        </label>
        <input list="categories" name="categories" placeholder="illustration, blog, noticias" className="mb-1" />
        {/* <datalist id="categories">
                    {generateDataListOption(categories)}
                </datalist> */}


        <div className="categories">
          {generateCategoriesCheckbox(categories)}
        </div>

        {/* <div>
                    <Button type="button" onClick={handleModalCategory}>Add another category</Button>
                </div> */}

        <div className="footer">
          <Button type="button" onClick={handleModalCategory}>Close</Button>
        </div>
      </dialog>
    </div>
  </>
}

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

const prepareInsertProduct = (formData: { [k: string]: FormDataEntryValue; }) => ({
  title: formData.title as string,
  body: formData.body as string,
  price: formData.price as unknown as number,
  stock: formData.stock as unknown as number,
  priceHidden: !!formData.priceHidden,
  tags: formData.tags as unknown as string[],
  downloadUrl: formData.downloadUrl as string,
  published: !formData.draft
})

function prepareMarkdownPost(formData: { [k: string]: FormDataEntryValue; }) {
  const { preview, images, ...data } = formData;
  const post: MarkdownPost = {
    type: data.type as string,
    title: data.title as string,
    slug: slugify((data.slug || data.title) as string),
    body: data.body as string,
    categories: data.categories as string,
    draft: !!data.draft,
  }

  return post;
}

export const action: ActionFunction = async ({ request }) => {
  const clonedRequest = request.clone()
  const formData = await request.formData();
  const fromEntries = Object.fromEntries(formData);

  const markdownSubfolder = fromEntries.type !== 'products' ? `/${fromEntries.type}` : "";
  const imageRelativePath = `${ASSET_PATH.MARKDOWN}${markdownSubfolder}`;
  const multipartData = await uploadFilesAction(clonedRequest, { relativePath: imageRelativePath });
  const previewData = multipartData.getAll('preview') as NodeOnDiskFile[];
  const imagesData = multipartData.getAll('images') as NodeOnDiskFile[];

  const resultImages = {
    preview: mapFile(previewData[0]),
    images: imagesData.map((imageData) => mapFile(imageData))
  }

  if (fromEntries.type === "products") {
    const insertData = prepareInsertProduct(fromEntries);

    await productService.create({
      slug: slugify((fromEntries.slug || fromEntries.title) as string),
      ...insertData,
      ...resultImages
    })
  } else {
    const insertData = prepareMarkdownPost(fromEntries);

    createContent({
      ...insertData,
      ...resultImages,
      preview: resultImages.preview.url,
      slug: slugify((fromEntries.slug || fromEntries.title) as string),
    });
  }

  return redirect("/admin/markdown/create", { status: 303 });
};

export const loader = async () => {
  const categories = await categoryService.listPopulated();
  return { loaded: true, categories };
}

export default function UploadContent() {
  const { categories } = useLoaderData<{ categories: Category[] }>() as { categories: Category[] };
  const navigation = useNavigation()
  const [isDigitalVisible, setDigitalVisible] = useToggle(false)
  const [isPriceHidden, setPriceHidden] = useToggle(false)
  const isSubmitting = navigation.state === "submitting";

  const [isProduct, setIsProduct] = useAtom(productAtom)
  const [showMoreImages, setShowMoreImages] = useAtom(imagesAtom)

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value;
    setIsProduct(type === "products")
  }

  const handleOnPreview = (preview: FilePreview[]) => {
    if (preview.length > 0) {
      setShowMoreImages(true)
    } else {
      setShowMoreImages(false)
    }
  }

  return (
    <div className="container">
      <h1>New Content</h1>
      <Form method="post" encType="multipart/form-data">
        <label htmlFor="type">
          Content Type
        </label>
        <select id="type" name="type" onChange={handleTypeChange}>
          {MARKDOWN_TYPES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <fieldset>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" placeholder="Noche de Reyes" />

          <label htmlFor="body">
            Description
          </label>
          <textarea id="body" name="body" rows={5} className="mb-1" />

          <div className="box">
            <h3>Categories</h3>
            <DialogDataList categories={categories} />
          </div>

          <label htmlFor="categories">
            Tags
          </label>
          <input id="tags" name="tags" placeholder="illustration, sunset, beer" />

          <label htmlFor="slug">Post Slug</label>
          <input id="slug" name="slug" placeholder="noche-de-reyes" />
        </fieldset>

        <fieldset>
          <InputFilePreview id="preview" name="preview" labelText="Select Image" onPreview={handleOnPreview} />
          {isProduct && showMoreImages && <InputFilePreview id="images" name="images" multiple={true} labelText="Select more images" />}
        </fieldset>

        {isProduct && (
          <>

            <fieldset>
              <label htmlFor="isDigital" className="block">
                <input type="checkbox" id="isDigital" name="isDigital" onChange={setDigitalVisible} />Is a digital product
              </label>
              {isDigitalVisible &&
                <>
                  <label htmlFor="downloadUrl">Download URL</label>
                  <input type="text" id="downloadUrl" name="downloadUrl" placeholder="https://fiebrediseno.empretienda.com.ar/plantillas-para-redes/flower-power-kit-de-dibujos" />
                </>
              }
            </fieldset>

            <fieldset>
              {!isPriceHidden &&
                <>
                  <label htmlFor="price">Price</label>
                  <input id="price" name="price" placeholder="0.00" />
                </>
              }

              <div className="block">
                <label htmlFor="priceHidden">
                  Price Hidden
                  <input id="priceHidden" name="priceHidden" type="checkbox" defaultChecked={false} onChange={() => setPriceHidden()} />
                </label>
              </div>
            </fieldset>

            <label htmlFor="stock">Stock</label>
            <input id="stock" name="stock" placeholder="0" />
          </>
        )}

        <fieldset>
          <div className="block">
            <label htmlFor="markdown">
              Save as markdown file
              <input id="markdown" name="markdown" type="checkbox" defaultChecked={true} />
            </label>
          </div>

          <div className="block">
            <label htmlFor="draft">
              Save as draft
              <input id="draft" name="draft" type="checkbox" defaultChecked={true} />
            </label>
          </div>
        </fieldset>

        <div>
          <Button color="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Please Wait..." : "Save markdown"}</Button>
        </div>
      </Form>
    </div>
  );
}
