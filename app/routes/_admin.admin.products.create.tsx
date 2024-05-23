import { useActionData, useLoaderData, useLocation, useNavigate, useNavigation } from "@remix-run/react";
import { type LoaderFunction, type ActionFunction } from "@remix-run/node";
import { atom, useAtom } from 'jotai'
import { ValidatedForm } from "remix-validated-form";

import { loaderAdminProductCreate, actionAdminProductCreate, adminProductCreateValidator } from "~/server/controllers/products.controller";
import TextArea from "~/components/form/input/Textarea";
import InputValidation from "~/components/form/input/InputValidation";
import { InputSubmit } from "~/components/form/input/InputSubmit";
import Input from "~/components/form/input/Input";
import useDocument from "~/hooks/useDocument";
import useWindow from "~/hooks/useWindow";

const priceHidden = atom(false);
const currentProductType = atom("physical");

export const loader: LoaderFunction = loaderAdminProductCreate;
export const action: ActionFunction = actionAdminProductCreate;


export default function UploadContent() {
  const { category } = useLoaderData<typeof loader>();
  const error = useActionData<typeof action>()
  const location = useLocation();
  const [productType, setProductType] = useAtom(currentProductType)
  const [isPriceHidden, setPriceHidden] = useAtom(priceHidden)

  return (
    <div className="container">
      <h1>New Product</h1>
      {category?.slug && <p>Category {category?.slug}</p>}
      <ValidatedForm
        validator={adminProductCreateValidator}
        method="post"
        encType="multipart/form-data"
      >
        <fieldset className="mb-2">
          <InputValidation type="text" label="Title" id="title" name="title" placeholder="Noche de Reyes" required />
          <TextArea label='Description' id="description" name="description" rows={5} />
        </fieldset>

        <fieldset className="mb-2">
          <InputValidation type="file-preview" label="Images" id="images" name="images" multiple={true} />
          {error?.images && <p className="box color-danger">{error.images}</p>}
        </fieldset>
        <hr />

        <fieldset className="mb-2">
          <legend>Price</legend>
          <div>
            <InputValidation type="checkbox" labelProps={{ className: "flex items-center mb-1" }} label="Don't show" id="priceHidden" name="priceHidden" defaultChecked={false} onChange={() => setPriceHidden(!isPriceHidden)} />
          </div>

          <div className="mt-1">
            <InputValidation type="text" label="Amount in cents" id="priceInCents" name="priceInCents" placeholder="1000 = $1.00" defaultValue={0} disabled={isPriceHidden} />
          </div>
        </fieldset>
        <fieldset className="mb-2">
          <legend>Product Type</legend>
          <Input type="radio" label="Physical" labelProps={{ className: "flex items-center mb-1" }} id="productTypePhysical" name="productType" value="physical" onChange={() => setProductType("physical")} defaultChecked={productType === "physical"} />
          <Input type="radio" label="External link" labelProps={{ className: "flex items-center mb-1" }} id="productTypeLink" name="productType" value="link" onChange={() => setProductType("link")} defaultChecked={productType === "link"} />
          <Input type="radio" label="Download" labelProps={{ className: "flex items-center mb-1" }} id="productTypeDownload" name="productType" value="file" onChange={() => setProductType("file")} defaultChecked={productType === "file"} />
          {productType === "physical" && <InputValidation type="text" label='Stock' key="stock" id="stock" name="stock" placeholder="0" />}
          {productType === "link" && <InputValidation type="text" label='Download URL' key="downloadUrl" id="downloadUrl" name="downloadUrl" placeholder="https://fiebrediseno.empretienda.com.ar/plantillas-para-redes/flower-power-kit-de-dibujos" />}
          {productType === "file" && <InputValidation type='file' label='File' id="file" name="file" />}
          {error?.productType && <p className="box color-danger error danger">{error.productType}</p>}
        </fieldset>
        <hr />

        <fieldset className="mb-2">
          <InputValidation type="text" label='Tags' key="tags" id="tags" name="tags" placeholder="illustration, sunset, beer" />
          <InputValidation type="text" label='Slug' key="slug" id="slug" name="slug" placeholder="my-custom-slug-for-SEO" />
        </fieldset>


        <hr />
        <fieldset className="mb-2">
          <div className="inline-block">
            <InputValidation type="checkbox" label="Save as draft" id="draft" name="draft" defaultChecked={true} />
          </div>
        </fieldset>

        <fieldset>
          <input type="hidden" name="state" value={JSON.stringify(location.state) || ""} />
          <input type="hidden" name="referrer" value={location.state.referrer || ""} />
          <InputValidation type="hidden" id="categoryId" name="categoryId" value={category?.name} />
          <InputSubmit label="Save" />
        </fieldset>
      </ValidatedForm>
    </div >
  );
}
