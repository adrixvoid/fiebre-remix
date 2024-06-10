import { Link, useSubmit, useNavigation, useParams, useLocation, useLoaderData } from "@remix-run/react";
import { createColumnHelper, CellContext } from '@tanstack/react-table'
import { Trash2 } from "lucide-react";

import { t } from "~/i18n/translate";
import { Breadcrumb, Category } from '~/types/global.type';
import { ADMIN_ROUTE_PATH } from "~/constants";

import { CategoryDocument } from "~/server/schema/category.schema";
import { loaderAdminCategoriesList } from "~/server/controllers/categories.controller";
import { AdminCategoryLoaderList, CATEGORY_PARAMS } from "~/server/controllers/categories.controller";
import { PRODUCT_PARAMS } from "~/server/controllers/products.controller";

import { Button } from "~/components/button/Button";
import AdminCategoryBreadcrumb from "~/components/categories/AdminCategoryBreadcrumb";
import AdminProductsTable from "~/components/products/AdminProductsTable";
import AdminTable from "~/components/table/AdminTable";

import { FolderPlus } from "lucide-react";

const initialLocationState = {
  breadcrumb: [{
    name: "Categories",
    path: ADMIN_ROUTE_PATH.CATEGORY_LIST
  }]
};

const columnHelper = createColumnHelper<CategoryDocument>()

const columns = [
  columnHelper.accessor('name', {
    header: () => <span>Category name</span>,
    cell: props => {
      const location = useLocation();
      const breadcrumbState: Breadcrumb[] = location.state?.breadcrumb || initialLocationState?.breadcrumb || [];
      const subcategoryURL = `${ADMIN_ROUTE_PATH.CATEGORY_LIST}/${props.row.original.path as string}`;

      return (
        <Link
          className="underline-offset-4 hover:underline"
          to={subcategoryURL}
          state={{
            breadcrumb: [
              ...breadcrumbState,
              {
                name: props.getValue(),
                path: subcategoryURL
              }
            ]
          }}
        >
          {props.getValue()}
        </Link>
      )
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <span>{t('GLOBAL.ACTIONS')}</span>,
    cell: (props: CellContext<Category, unknown>) => {
      const slug = props.row.original.slug as string;
      const id = props.row.original._id?.toString() || "";
      const name = props.row.original.name as string;

      const editPath = `${ADMIN_ROUTE_PATH.CATEGORY_EDIT}/${id}`;
      const deletePath = `${ADMIN_ROUTE_PATH.CATEGORY_DELETE}/${id}`;

      const params = useParams();
      const navigation = useNavigation();
      const submit = useSubmit();
      const isDeleting = params.slug === slug && navigation.state === "loading";
      const subcategories = props.row.original?.subcategories;
      const isDisabled = isDeleting || (subcategories && subcategories.length > 0)

      const handleOnDelete = () => {
        if (subcategories && subcategories.length > 0) {
          alert(`${name} no puede eliminarse porque tiene sub-categorías asociadas`)
          return;
        }

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
          <Button onClick={handleOnDelete} aria-label="delete" disabled={isDisabled} variant="destructive">
            <Trash2 />
            <span className="sr-only">{t('GLOBAL.DELETE')}</span>
          </Button>
        </div>
      )
    }
  }),
]
///

export const loader = loaderAdminCategoriesList;

function AdminCategoriesList() {
  const { list, category, breadcrumb, products } = useLoaderData<AdminCategoryLoaderList>() as AdminCategoryLoaderList;
  const location = useLocation();

  const editPath = category?.id ? `${ADMIN_ROUTE_PATH.CATEGORY_EDIT}/${category.id}` : undefined;
  const newCategoryPath = {
    pathname: ADMIN_ROUTE_PATH.CATEGORY_CREATE,
    search: category?.slug ? `?${CATEGORY_PARAMS.PARENT}=${category.slug}` : '',
  };
  const pathToNewProduct = {
    pathname: ADMIN_ROUTE_PATH.PRODUCT_FORM,
    search: category?.slug ? `?${PRODUCT_PARAMS.CATEGORY_ID}=${category._id}` : ''
  };

  return (
    <section className="admin admin-categories">
      <div className="container">
        <div className="flex justify-between items-center mt-4">
          <h1 className="h1 text-2xl font-600 tracking-tight">{category?.name && <span>{category?.name} in</span>} {t("CATEGORY.CATEGORIES")}</h1>
        </div>
        <div className="flex admin-top text-sm mt-2 py-2 justify-between items-center">
          <div className="left">
            {breadcrumb &&
              <AdminCategoryBreadcrumb breadcrumb={breadcrumb} editPath={editPath} />}
          </div>
          <div className="right">
            <div className="actions flex" style={{ gap: "0.5rem" }}>
              <Button asChild size="sm">
                <Link to={newCategoryPath} state={location.state}><FolderPlus className="mr-2 h-4 w-4" /> {t('CATEGORY.NEW')}</Link>
              </Button>
              <Button asChild size="sm">
                <Link to={pathToNewProduct} state={location.state}><FolderPlus className="mr-2 h-4 w-4" /> {t('PRODUCT.NEW')}</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="admin-list mt-4">
          {list.length > 0
            ? <AdminTable columns={columns} data={list} caption="List of subcategories" />
            : <p className="box paper m-0">{t('CATEGORY.EMPTY')}</p>
          }
        </div>
        <div className="admin-list mt-4">
          {products.length > 0 && <AdminProductsTable data={products} />}
        </div>
      </div>
    </section>
  )
}

export default AdminCategoriesList
