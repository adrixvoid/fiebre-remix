import { useActionData, useLoaderData, useLocation } from "@remix-run/react";
import { type LoaderFunction, type ActionFunction } from "@remix-run/node";
import { atom, useAtom } from 'jotai'
import { ValidatedForm } from "remix-validated-form";

import { loaderAdminProduct, actionAdminProduct, LoaderAdminProduct } from "~/server/controllers/products.controller";
import { productValidator } from "~/server/zod/products.zod";

import InputValidation from "~/components/form/InputValidation";
import { InputSubmit } from "~/components/form/InputSubmit";
import Input from "~/components/form/Input";
import UploadedImages from "~/components/form/input-file-preview/UploadedImages";
import { CategorySelect } from "~/components/categories/CategorySelect";
import useReferrer from "~/hooks/useReferrer";
import TextEditor from "~/components/form/text-editor/TextEditor";

const priceHidden = atom(false);
const currentProductType = atom("stock");

export const loader: LoaderFunction = loaderAdminProduct;
export const action: ActionFunction = actionAdminProduct;

export default function AdminProductForm() {
  const { category, product } = useLoaderData<typeof loader>() as LoaderAdminProduct;
  const referrer = useReferrer();
  const error = useActionData<typeof action>()
  const location = useLocation();
  const [productType, setProductType] = useAtom(currentProductType)
  const [isPriceHidden, setPriceHidden] = useAtom(priceHidden)

  return (
    <div className="container">
      <h1 className="h1 text-2xl font-600 tracking-tight">{Boolean(product) ? "Edit Product" : "New Product"}</h1>
      <ValidatedForm
        validator={productValidator}
        method="post"
        encType="multipart/form-data"
      >
        <fieldset className="mt-10">
          <div className="mt-6">
            <InputValidation name="categoryId" asChild>
              <CategorySelect defaultValue={category?._id} label="Category" placeholder="Select a category" />
            </InputValidation>
          </div>
        </fieldset>
        <hr className="mt-8" />
        <fieldset>
          <div className="mt-6">
            <InputValidation type="text" label="Title" id="title" name="title" placeholder="Noche de Reyes" required defaultValue={product?.title} />
          </div>
          <div className="mt-6">
            <TextEditor label='Description' id="description" name="description" rows={5} defaultValue={product?.description} />
          </div>
        </fieldset>
        <hr className="mt-8" />
        <fieldset>
          <div className="mt-6">
            <InputValidation className='mb-2' label="Images" multiple={true} name="images" asChild>
              <UploadedImages source={product?.images} />
            </InputValidation>
            {error?.images && <p className="box paper color-danger">{error.images}</p>}
          </div>
        </fieldset>
        <hr className="mt-8" />
        <fieldset>
          <div className="mt-6">
            <legend>Price</legend>
            <InputValidation id="priceHidden" name="priceHidden" type="checkbox" label="Don't show" labelProps={{ className: "flex items-center mb-1" }} defaultChecked={false} onChange={() => setPriceHidden(!isPriceHidden)} defaultValue={product?.title} />
          </div>

          <div className="mt-6">
            <InputValidation id="priceInCents" name="priceInCents" type="text" label="Amount in cents" placeholder="1000 = $1.00" disabled={isPriceHidden} defaultValue={product?.priceInCents || 0} />
          </div>
        </fieldset>
        <hr className="mt-8" />
        <fieldset>
          <div className="mt-6">
            <legend>Product Type</legend>
            <Input type="radio" id="productType[stock]" name="productType" label="Physical Stock" value="stock" onChange={() => setProductType("stock")} labelProps={{ className: "flex items-center mb-1" }} checked={productType === "stock"} />
            <Input type="radio" id="productType[downloadUrl]" name="productType" label="External URL" value="downloadUrl" onChange={() => setProductType("downloadUrl")} labelProps={{ className: "flex items-center mb-1" }} checked={productType === "downloadUrl"} />
            <Input type="radio" id="productType[file]" name="productType" label="Download File" value="file" onChange={() => setProductType("file")} labelProps={{ className: "flex items-center mb-1" }} checked={productType === "file"} />
          </div>
          <div className="mt-6">
            {productType === "stock" && <InputValidation type="text" label='Stock' key="stock" id="stock" name="stock" placeholder="0" defaultValue={product?.stock} />}
            {productType === "downloadUrl" && <InputValidation type="text" label='Download URL' key="downloadUrl" id="downloadUrl" name="downloadUrl" placeholder="https://fiebrediseno.empretienda.com.ar/plantillas-para-redes/flower-power-kit-de-dibujos" defaultValue={product?.downloadUrl} />}
            {productType === "file" && (
              <>
                <InputValidation type="file" label="File" id="file" name="file" />
                <p className='mb-2'>{product?.file?.url}</p>
              </>
            )}
          </div>
          {error?.productType && <p className="box paper color-danger error danger">{error.productType}</p>}
        </fieldset>
        <hr className="mt-8" />

        <fieldset className="mt-4">
          <div className="mt-6">
            <InputValidation type="text" label='Tags' key="tags" id="tags" name="tags" placeholder="illustration, sunset, beer" defaultValue={product?.tags} />
          </div>
          <div className="mt-6">
            <InputValidation type="text" label='Slug' key="slug" id="slug" name="slug" placeholder="my-custom-slug-for-SEO" defaultValue={product?.slug} />
          </div>
        </fieldset>


        <hr className="mt-8" />
        <fieldset className="mt-4">
          <div className="inline-block">
            <InputValidation type="checkbox" label="Save as draft" id="draft" name="draft" defaultChecked={true} />
          </div>
        </fieldset>

        <fieldset className="mt-4">
          <input type="hidden" name="state" value={JSON.stringify(location.state) || ""} />
          <input type="hidden" name="referrer" value={referrer} />
          <InputValidation type="hidden" id="id" name="id" value={product?._id} />
          <InputSubmit label="Save" />
        </fieldset>
      </ValidatedForm>
    </div >
  );
}
