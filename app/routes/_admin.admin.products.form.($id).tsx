import { type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { useActionData, useLoaderData, useLocation } from "@remix-run/react";
import { atom, useAtom } from 'jotai';

import { ValidatedForm } from "remix-validated-form";
import { productSchemaValidator } from "~/server/zod/products.zod";

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

import { actionAdminProductForm, LoaderAdminProduct, loaderAdminProductForm } from "~/server/controllers/products.controller";

import { Title } from "~/components/ui/text/Text";
import { ROUTE_PATH_ADMIN } from "~/constants";
import useReferrer from "~/hooks/useReferrer";
import { t } from "~/i18n/translate";
import { ProductType } from "~/types/product";

const priceHidden = atom(false);
const currentProductType = atom("stock");

export const loader: LoaderFunction = loaderAdminProductForm;
export const action: ActionFunction = actionAdminProductForm;

export default function AdminProductForm() {
  const { category, product } = useLoaderData<typeof loader>() as LoaderAdminProduct;
  const referrer = useReferrer({ defaultReferrer: ROUTE_PATH_ADMIN.PRODUCT_LIST });
  const error = useActionData<typeof action>()
  const location = useLocation();
  const [productType, setProductType] = useAtom(currentProductType)
  const [isPriceHidden, setPriceHidden] = useAtom(priceHidden)

  return (
    <Section marginBottom>
      <Container>
        <Title as='h1' size='lg'>{Boolean(product) ? "Edit Product" : "New Product"}</Title>
        <ValidatedForm
          validator={productSchemaValidator}
          method="post"
          encType="multipart/form-data"
        >
          <Fieldset>
            <FormBlock>
              <ValidateInput name="name">
                <Input type="text" label="Product Name" id="name" name="name" placeholder="My wonderful product!" required defaultValue={product?.name} />
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
                <Input type="checkbox" id="priceHidden" name="priceHidden" label="Don't show" labelProps={{ className: "flex items-center mb-1" }} defaultChecked={false} onChange={() => setPriceHidden(!isPriceHidden)} defaultValue={product?.name} />
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
              <Input type="radio" id={`productType[${ProductType.stock}]`} name="productType" label="Physical Stock" value="stock" onChange={() => setProductType(ProductType.stock)} checked={productType === ProductType.stock} />
              <Input type="radio" id={`productType[${ProductType.externalUrl}]`} name="productType" label="External URL" value="externalUrl" onChange={() => setProductType(ProductType.externalUrl)} checked={productType === ProductType.externalUrl} />
              <Input type="radio" id={`productType[${ProductType.file}]`} name="productType" label="Download File" value="file" onChange={() => setProductType(ProductType.file)} checked={productType === ProductType.file} />
            </FormBlock>
            <FormBlock>
              {productType === ProductType.stock && (
                <ValidateInput name="stock">
                  <Input type="text" key="stock" id="stock" name={ProductType.stock} label='Stock' placeholder="0" defaultValue={product?.stock} />
                </ValidateInput>
              )}
              {productType === ProductType.externalUrl && (
                <ValidateInput name={ProductType.externalUrl}>
                  <Input type="text" key="externalUrl" id="externalUrl" name={ProductType.externalUrl} label='Download URL' placeholder="https://fiebrediseno.empretienda.com.ar/plantillas-para-redes/flower-power-kit-de-dibujos" defaultValue={product?.externalUrl} />
                </ValidateInput>
              )}
              {productType === ProductType.file && (
                <>
                  <ValidateInput name={ProductType.file}>
                    <Input type="file" label="File" id="file" name={ProductType.file} />
                  </ValidateInput>
                  <p className='mb-2'>{product?.localFile?.url}</p>
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
              <Input type="checkbox" label="published product" id="published" name="published" defaultChecked={product?.published} />
            </div>
          </Fieldset>

          <Fieldset>
            <input type="hidden" name="state" value={JSON.stringify(location.state) || ""} />
            <input type="hidden" name="referrer" value={referrer} />
            <input type="hidden" id="id" name="id" value={product?.id} />
            <InputSubmitValidator label="Save" />
          </Fieldset>
        </ValidatedForm>
      </Container>
    </Section>
  );
}
