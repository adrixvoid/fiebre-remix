import { useSubmit, useNavigation, useParams, useLoaderData } from "@remix-run/react";
import { createColumnHelper } from '@tanstack/react-table'
import { Trash2 } from "lucide-react";

import { t } from "~/i18n/translate";
import { Product } from '~/types/global.type';
import { ROUTE_PATH_ADMIN } from "~/constants";
import { loaderAdminProductList } from "~/server/controllers/products.controller";

import Button from "~/components/button/Button";
import AdminCategoryBreadcrumb from "~/components/categories/AdminCategoryBreadcrumb";
import { Link } from "~/components/link/Link";
import AdminTable from "~/components/table/AdminTable";
import { Container } from "~/components/container/Container";

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
    header: () => <span>{t('GLOBAL.IMAGE')}</span>,
    cell: (props) => <img src={props.row.original.images?.[0].url} className="admin-banner-preview rounded-md" />
  }),
  columnHelper.accessor('title', {
    id: 'title',
    header: () => <span>{t('PRODUCT.PRODUCT')}</span>,
    cell: props => props.getValue()
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <span>{t('GLOBAL.ACTIONS')}</span>,
    cell: (props) => {
      const slug = props.row.original.slug as string;
      const id = props.row.original._id?.toString() || "";
      const name = props.row.original.title as string;

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
        <div className="actions">
          <Button asChild variant="outline">
            <Link to={editPath}>{t('GLOBAL.EDIT')}</Link>
          </Button>
          <Button onClick={handleOnDelete} aria-label="delete" disabled={isDisabled} variant="destructive" color="danger">
            <Trash2 />
            <span className="sr-only">{t('GLOBAL.DELETE')}</span>
          </Button>
        </div>
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
    <section className="admin admin-categories">
      <Container>
        <h1 className="h1 text-2xl font-600 tracking-tight">{t("PRODUCT.NEW")}</h1>
        <div className="flex admin-top text-sm mt-2 py-2 justify-between items-center">
          <div className="justify-end">
            <div className="actions flex" style={{ gap: "0.5rem" }}>
              <Button asChild size="sm">
                <Link to={pathToNewProduct}>{t('PRODUCT.NEW')}</Link>
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
    </section>
  )
}
