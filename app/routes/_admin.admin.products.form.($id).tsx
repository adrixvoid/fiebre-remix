import { type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { useActionData, useLoaderData, useLocation } from "@remix-run/react";
import { useForm } from "@rvf/remix";
import { atom, useAtom } from 'jotai';

import { CategorySelect } from "~/components/categories/CategorySelect";
import { Alert } from "~/components/ui/alert/Alert";
import { Container } from "~/components/ui/container/Container";
import { Fieldset } from "~/components/ui/form/Fieldset";
import { FormBlock } from "~/components/ui/form/FormBlock";
import Input from "~/components/ui/form/Input";
import InputFilePreview from "~/components/ui/form/input-file-preview/InputFilePreview";
import { InputImageList } from "~/components/ui/form/input-file-preview/UploadedImages";
import { InputPrice } from "~/components/ui/form/InputPrice";
import { InputSubmit } from "~/components/ui/form/InputSubmit";
import TextEditor from "~/components/ui/form/text-editor/TextEditor";
import { Section } from "~/components/ui/section/Section";
import { Title } from "~/components/ui/text/Text";

import { action_AdminProductForm, loader_AdminProductForm, LoaderAdminProduct } from "~/server/controllers/products.controller";
import { productSchemaValidator } from "~/server/zod/products.zod";

import { ROUTE_PATH_ADMIN } from "~/constants";
import useReferrer from "~/hooks/useReferrer";
import { t } from "~/i18n/translate";
import { PRODUCT_TYPE } from "~/types/product";

const priceHidden = atom(false);
const currentProductType = atom("stock");

export const loader: LoaderFunction = loader_AdminProductForm;
export const action: ActionFunction = action_AdminProductForm;

export default function AdminProductForm() {
  const { category, product } = useLoaderData<typeof loader>() as LoaderAdminProduct;
  const referrer = useReferrer({ defaultReferrer: ROUTE_PATH_ADMIN.PRODUCT_LIST });
  const error = useActionData<typeof action>()
  const location = useLocation();
  const [productType, setProductType] = useAtom(currentProductType)
  const [isPriceHidden, setPriceHidden] = useAtom(priceHidden)

  const form = useForm({
    method: 'post',
    encType: "multipart/form-data",
    validator: productSchemaValidator,
    defaultValues: {
      ...product,
      name: product?.name || "",
    }
  });

  return (
    <Section marginBottom>
      <Container>
        <Title as='h1' size='lg'>{Boolean(product) ? "Edit Product" : "New Product"}</Title>
        <form {...form.getFormProps()}>
          <Fieldset>
            <FormBlock>
              <Input type="text" label="Product Name" id="name" name="name" placeholder="My wonderful product!" required defaultValue={product?.name} {...form.getInputProps("name")} error={form.error("name")} />
            </FormBlock>
            <FormBlock>
              <CategorySelect id="categoryId" name="categoryId" label="Category" placeholder="Select a category" defaultValue={category?.id} error={form.error("categoryId")} />
            </FormBlock>
            <FormBlock>
              <TextEditor label='Description' id="description" name="description" rows={5} defaultValue={product?.description || ''} error={form.error("description")} />
            </FormBlock>
          </Fieldset>
          <hr />
          <Fieldset>
            <FormBlock>
              <InputImageList name="imagesToDelete" source={product?.images} multiple={true} />
              <InputFilePreview type="file" name="images" label="Images" multiple={true} accept="images/*" error={form.error("images")} />
            </FormBlock>
            {error?.images && <Alert variant='danger'>{error.images}</Alert>}
          </Fieldset>
          <hr />
          <Fieldset>
            <FormBlock>
              <legend>{t('PRODUCT.PRICE')}</legend>
              <Input type="checkbox" id="priceHidden" name="priceHidden" label="Don't show" defaultChecked={false} onChange={() => setPriceHidden(!isPriceHidden)} />
            </FormBlock>

            <FormBlock>
              <InputPrice type="text" id="priceInCents" name="priceInCents" label="Amount in cents" placeholder="1000 = $1.00" disabled={isPriceHidden} defaultValue={product?.priceInCents || 0} />
            </FormBlock>
          </Fieldset>
          <hr />
          <Fieldset>
            <legend>{t('PRODUCT.PRODUCT_TYPE')}</legend>
            <FormBlock variant="inline">
              <Input type="radio" id={`productType[${PRODUCT_TYPE.stock}]`} name="productType" label="Physical Stock" value="stock" onChange={() => setProductType(PRODUCT_TYPE.stock)} checked={productType === PRODUCT_TYPE.stock} />
              <Input type="radio" id={`productType[${PRODUCT_TYPE.externalUrl}]`} name="productType" label="External URL" value="externalUrl" onChange={() => setProductType(PRODUCT_TYPE.externalUrl)} checked={productType === PRODUCT_TYPE.externalUrl} />
              <Input type="radio" id={`productType[${PRODUCT_TYPE.storedFile}]`} name="productType" label="Download File" value="file" onChange={() => setProductType(PRODUCT_TYPE.storedFile)} checked={productType === PRODUCT_TYPE.storedFile} />
            </FormBlock>
            <FormBlock>
              {productType === PRODUCT_TYPE.stock && (
                <Input type="text" key="stock" id="stock" name={PRODUCT_TYPE.stock} label='Stock' placeholder="0" defaultValue={product?.stock} />
              )}
              {productType === PRODUCT_TYPE.externalUrl && (
                <Input type="text" key="externalUrl" id="externalUrl" name={PRODUCT_TYPE.externalUrl} label='Download URL' placeholder="https://fiebrediseno.empretienda.com.ar/plantillas-para-redes/flower-power-kit-de-dibujos" defaultValue={product?.externalUrl || ''} />
              )}
              {productType === PRODUCT_TYPE.storedFile && (
                <>
                  <Input type="file" label="File" id="file" name={PRODUCT_TYPE.storedFile} error={form.error(PRODUCT_TYPE.storedFile)} />
                  <p className='mb-2'>{product?.storedFile?.url}</p>
                </>
              )}
            </FormBlock>
            {error?.productType && <p className="box paper color-danger error danger">{error.productType}</p>}
          </Fieldset>
          <hr />

          <Fieldset>
            <FormBlock>
              <Input type="text" label='Tags' key="tags" id="tags" name="tags" placeholder="illustration, sunset, beer" defaultValue={product?.tags} />
            </FormBlock>
            <FormBlock>
              <Input type="text" label='Slug' key="slug" id="slug" name="slug" placeholder="my-custom-slug-for-SEO" defaultValue={product?.slug} />
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
            <input type="hidden" id="id" name="id" value={product?.id} readOnly />
            <input type="hidden" name="_action" value={location.pathname} readOnly />
            <InputSubmit label="Save" />
          </Fieldset>
        </form>
      </Container>
    </Section>
  );
}
