import { useLoaderData, useNavigation, useParams, useSubmit } from "@remix-run/react";
import { createColumnHelper } from '@tanstack/react-table';
import { FilePlus2, Trash2 } from "lucide-react";

import { ROUTE_PATH_ADMIN } from "~/constants";
import { t } from "~/i18n/translate";
import { Product } from '~/types/product';

import { loaderAdminProductList } from "~/server/controllers/products.controller";

import Button from "~/components/ui/button/Button";
import { Container } from "~/components/ui/container/Container";
import { Link } from "~/components/ui/link/Link";
import { Section } from "~/components/ui/section/Section";
import { Skeleton } from "~/components/ui/skeleton/Skeleton";
import AdminTable from "~/components/ui/table/AdminTable";
import { TableCellAction, TableHeadAction } from "~/components/ui/table/Table";
import { Toggle } from "~/components/ui/toggle/Toggle";
import { formatCurrency } from "~/lib/currency";

const styles = {
  images: {
    maxWidth: '100%',
    width: '50px'
  }
}
const columnHelper = createColumnHelper<Product>()
const columns = [
  columnHelper.accessor('images', {
    id: 'images',
    header: () => <span>{t('IMAGE')}</span>,
    cell: (props) => props.row.original.images?.[0] ? <img src={props.row.original.images?.[0].url} className="admin-banner-preview rounded-md" /> : <Skeleton>No image</Skeleton>
  }),
  columnHelper.accessor('name', {
    id: 'name',
    header: () => <span>{t('PRODUCT.PRODUCT')}</span>,
    cell: props => props.getValue()
  }),
  columnHelper.accessor('priceInCents', {
    id: 'priceInCents',
    header: () => <span>{t('PRODUCT.PRICE')}</span>,
    cell: props => formatCurrency(props.getValue() || 0)
  }),
  columnHelper.accessor('published', {
    id: 'published',
    header: () => <span>{t('PRODUCT.AVAILABLE_FOR_PURCHASE')}</span>,
    cell: props => {
      return <Toggle defaultChecked={props.getValue()} onChange={(checked) => console.log(checked)} size='sm' />
    }
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <TableHeadAction>{t('ACTIONS')}</TableHeadAction>,
    cell: (props) => {
      const slug = props.row.original.slug as string;
      const id = props.row.original._id?.toString() || "";
      const name = props.row.original.name as string;

      const editPath = `${ROUTE_PATH_ADMIN.PRODUCT_FORM}/${id}`;
      const deletePath = `${ROUTE_PATH_ADMIN.PRODUCT_LIST}/${id}`;

      const params = useParams();
      const navigation = useNavigation();
      const submit = useSubmit();
      const isDisabled = params.slug === slug && navigation.state === "loading";

      const handleOnDelete = () => {
        if (confirm(`Confirma que desea eliminar el siguiente Item?\n${name}`)) {
          const formData = new FormData();
          formData.append("id", id);
          submit(formData, { method: "post", action: deletePath, navigate: false });
        }
      }

      return (
        <TableCellAction>
          <Button asChild variant="outline">
            <Link to={editPath}>{t('EDIT')}</Link>
          </Button>
          <Button onClick={handleOnDelete} aria-label="delete" disabled={isDisabled} variant="destructive" color="danger">
            <Trash2 />
            <span className="sr-only">{t('DELETE')}</span>
          </Button>
        </TableCellAction>
      )
    },
  }),
];

export const loader = loaderAdminProductList;

export default function AdminProductList() {
  const { products } = useLoaderData<typeof loader>() as { products: Product[]; }

  const pathToNewProduct = {
    pathname: ROUTE_PATH_ADMIN.PRODUCT_FORM,
    search: ''
  };

  const pathToNewCategory = {
    pathname: ROUTE_PATH_ADMIN.CATEGORY_CREATE
  };

  return (
    <Section marginBottom>
      <Container>
        <h1 className="h1 text-2xl font-600 tracking-tight">{t("PRODUCT.LIST")}</h1>
        <div className="flex admin-top text-sm mt-2 py-2 justify-between items-center">
          <div className="justify-end">
            <div className="actions flex" style={{ gap: "0.5rem" }}>
              <Button asChild size="sm">
                <Link to={pathToNewProduct}><FilePlus2 size={16} />{t('PRODUCT.NEW')}</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="admin-list mt-2">
          <div>
            {products.length > 0
              ? <AdminTable columns={columns} data={products} columnStyles={styles} caption="List of products" />
              : <p className="m-0">{t('CATEGORY.EMPTY')}</p>
            }
          </div>
        </div>
      </Container>
    </Section>
  )
}
