import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { type LoaderFunction, type ActionFunction, type LinksFunction } from "@remix-run/node";
import { Fragment } from "react";
import { atom, useAtom } from 'jotai'
import cx from "classnames";

import { CONTENT_TYPE } from "~/constants";
import useToggle from "~/hooks/useToggle"
import { Category } from "~/types/global.type";

import Button from "~/components/button/Button";
// import InputFilePreview, { FilePreview } from "~/components/form/file/InputFilePreview";
import { CategoriesCheckbox } from "~/components/form/checkbox/CheckboxCategory";
import { contentAction, contentLoader } from "~/server/controllers/content.controller";

const imagesAtom = atom(false);
const productAtom = atom(false);
const modalCategory = atom(false);

export const action: ActionFunction = contentAction;

export const loader: LoaderFunction = contentLoader;

const DialogDataList = ({ categories }: { categories: Category[] }) => {
    const [isModalCategoryOpen, setModalCategoryOpen] = useAtom(modalCategory)

    function handleModalCategory(event: React.MouseEvent | React.KeyboardEvent) {
        console.log("handleModalCategory", event)
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

    const generateDataListOption = (categories: Category[], parent?: Category) => (
        categories.map(category => (
            <Fragment key={category._id}>
                {parent ? <option value={category.path.split('/').join(' / ')} /> : <option value={category.name} />}
                {category?.subcategories?.length > 0 && generateDataListOption(category.subcategories, category)}
            </Fragment >
        )
        ));

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

export default function UploadContent() {
    const { categories } = useLoaderData<{ categories: Category[] }>() as { categories: Category[] };
    const navigation = useNavigation()
    const [isDigitalVisible, setDigitalVisible] = useToggle(false)
    const [isPriceHidden, setPriceHidden] = useToggle(false)
    const isSubmitting = navigation.state === "submitting";

    const [isProduct, setIsProduct] = useAtom(productAtom)
    // const [showMoreImages, setShowMoreImages] = useAtom(imagesAtom)

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const type = event.target.value;
        setIsProduct(type === "products")
    }

    // const handleOnPreview = (preview: FilePreview[]) => {
    //     if (preview.length > 0) {
    //         setShowMoreImages(true)
    //     } else {
    //         setShowMoreImages(false)
    //     }
    // }

    return (
        <div className="container">
            <h1>New Content</h1>
            <Form method="post" encType="multipart/form-data">
                <fieldset>
                    <label htmlFor="type">
                        Content Type
                    </label>
                    <select id="type" name="type" onChange={handleTypeChange}>
                        {Object.keys(CONTENT_TYPE).map((key) => (
                            <option key={key} value={key}>
                                {CONTENT_TYPE[key as keyof typeof CONTENT_TYPE]}
                            </option>
                        ))}
                    </select>
                </fieldset>

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
                    {/* <InputFilePreview id="images" name="images" multiple={showMoreImages} label={showMoreImages ? 'Add images' : "Add image"} /> */}
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
                                    <input id="price" name="price" placeholder="0.00" defaultValue={0} />
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
