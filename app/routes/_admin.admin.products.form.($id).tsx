import { type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { useActionData, useLoaderData, useLocation } from "@remix-run/react";
import { atom, useAtom } from 'jotai';

import { ValidatedForm } from "remix-validated-form";
import { productValidator } from "~/server/zod/products.zod";

import { CategorySelect } from "~/components/categories/CategorySelect";
import { Container } from "~/components/ui/container/Container";
import { Fieldset } from "~/components/ui/form/Fieldset";
import { FormBlock } from "~/components/ui/form/FormBlock";
import Input from "~/components/ui/form/Input";
import InputFilePreview from "~/components/ui/form/input-file-preview/InputFilePreview";
import { InputImageList } from "~/components/ui/form/input-file-preview/UploadedImages";
import { InputPrice } from "~/components/ui/form/InputPrice";
import { InputSubmitValidator } from "~/components/ui/form/InputSubmit";
import TextEditor from "~/components/ui/form/text-editor/TextEditor";
import ValidateInput from "~/components/ui/form/ValidateInput";
import { Section } from "~/components/ui/section/Section";

import { actionAdminProduct, loaderAdminProduct, LoaderAdminProduct } from "~/server/controllers/products.controller";

import useReferrer from "~/hooks/useReferrer";
import { t } from "~/i18n/translate";

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
    <Section marginBottom>
      <Container>
        <h1 className="h1 text-2xl font-600 tracking-tight">{Boolean(product) ? "Edit Product" : "New Product"}</h1>
        <ValidatedForm
          validator={productValidator}
          method="post"
          encType="multipart/form-data"
        >
          <Fieldset>
            <FormBlock>
              <ValidateInput name="title">
                <Input type="text" label="Title" id="title" name="title" placeholder="Noche de Reyes" required defaultValue={product?.title} />
              </ValidateInput>
            </FormBlock>
            <FormBlock>
              <ValidateInput name="categoryId">
                <CategorySelect defaultValue={category?._id} label="Category" placeholder="Select a category" />
              </ValidateInput>
            </FormBlock>
            <FormBlock>
              <TextEditor label='Description' id="description" name="description" rows={5} defaultValue={product?.description} />
            </FormBlock>
          </Fieldset>
          <hr />
          <Fieldset>
            <FormBlock>
              <ValidateInput name='toDelete' className='mb-2'>
                <InputImageList source={product?.images} multiple={true} />
              </ValidateInput>
              <ValidateInput type="file" name="images" label="Images" className='mb-2' multiple={true} accept="images/*">
                <InputFilePreview />
              </ValidateInput>
            </FormBlock>
            {error?.images && <p className="box paper color-danger">{error.images}</p>}
          </Fieldset>
          <hr />
          <Fieldset>
            <FormBlock>
              <legend>{t('PRODUCT.PRICE')}</legend>
              <ValidateInput name="priceHidden">
                <Input type="checkbox" id="priceHidden" name="priceHidden" label="Don't show" labelProps={{ className: "flex items-center mb-1" }} defaultChecked={false} onChange={() => setPriceHidden(!isPriceHidden)} defaultValue={product?.title} />
              </ValidateInput>
            </FormBlock>

            <FormBlock>
              <ValidateInput name="priceHidden">
                <InputPrice type="text" id="priceInCents" name="priceInCents" label="Amount in cents" placeholder="1000 = $1.00" disabled={isPriceHidden} defaultValue={product?.priceInCents || 0} />
              </ValidateInput>
            </FormBlock>
          </Fieldset>
          <hr />
          <Fieldset>
            <legend>{t('PRODUCT.PRODUCT_TYPE')}</legend>
            <FormBlock variant="inline">
              <Input type="radio" id="productType[stock]" name="productType" label="Physical Stock" value="stock" onChange={() => setProductType("stock")} labelProps={{ className: "flex items-center mb-1" }} checked={productType === "stock"} />
              <Input type="radio" id="productType[downloadUrl]" name="productType" label="External URL" value="downloadUrl" onChange={() => setProductType("downloadUrl")} labelProps={{ className: "flex items-center mb-1" }} checked={productType === "downloadUrl"} />
              <Input type="radio" id="productType[file]" name="productType" label="Download File" value="file" onChange={() => setProductType("file")} labelProps={{ className: "flex items-center mb-1" }} checked={productType === "file"} />
            </FormBlock>
            <FormBlock>
              {productType === "stock" && (
                <ValidateInput name="stock">
                  <Input type="text" key="stock" id="stock" name="stock" label='Stock' placeholder="0" defaultValue={product?.stock} />
                </ValidateInput>
              )}
              {productType === "downloadUrl" && (
                <ValidateInput name="downloadUrl">
                  <Input type="text" key="downloadUrl" id="downloadUrl" name="downloadUrl" label='Download URL' placeholder="https://fiebrediseno.empretienda.com.ar/plantillas-para-redes/flower-power-kit-de-dibujos" defaultValue={product?.downloadUrl} />
                </ValidateInput>
              )}
              {productType === "file" && (
                <>
                  <ValidateInput name="file">
                    <Input type="file" label="File" id="file" name="file" />
                  </ValidateInput>
                  <p className='mb-2'>{product?.file?.url}</p>
                </>
              )}
            </FormBlock>
            {error?.productType && <p className="box paper color-danger error danger">{error.productType}</p>}
          </Fieldset>
          <hr />

          <Fieldset>
            <FormBlock>
              <ValidateInput name="tags">
                <Input type="text" label='Tags' key="tags" id="tags" name="tags" placeholder="illustration, sunset, beer" defaultValue={product?.tags} />
              </ValidateInput>
            </FormBlock>
            <FormBlock>
              <ValidateInput name="slug">
                <Input type="text" label='Slug' key="slug" id="slug" name="slug" placeholder="my-custom-slug-for-SEO" defaultValue={product?.slug} />
              </ValidateInput>
            </FormBlock>
          </Fieldset>


          <hr />
          <Fieldset>
            <div className="inline-block">
              <ValidateInput name="draft">
                <Input type="checkbox" label="Save as draft" id="draft" name="draft" defaultChecked={true} />
              </ValidateInput>
            </div>
          </Fieldset>

          <Fieldset>
            <input type="hidden" name="state" value={JSON.stringify(location.state) || ""} />
            <input type="hidden" name="referrer" value={referrer} />
            <input type="hidden" id="id" name="id" value={product?._id} />
            <InputSubmitValidator label="Save" />
          </Fieldset>
        </ValidatedForm>
      </Container>
    </Section>
  );
}
