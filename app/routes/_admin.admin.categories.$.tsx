import { ActionFunction, json } from "@remix-run/node";
import { useLoaderData, useLocation, useNavigation, useParams, useSubmit } from "@remix-run/react";
import { CellContext, createColumnHelper } from '@tanstack/react-table';
import { FilePlus2, Trash2 } from "lucide-react";

import { ROUTE_PATH_ADMIN } from "~/constants";
import { t } from "~/i18n/translate";
import { Breadcrumb } from '~/types/breadcrumb';

import { AdminCategoryLoaderList, CATEGORY_PARAMS, loaderAdminCategoriesList } from "~/server/controllers/categories.controller";
import { PRODUCT_PARAMS } from "~/server/controllers/products.controller";

import AdminCategoryBreadcrumb from "~/components/categories/AdminCategoryBreadcrumb";
import AdminProductsTable from "~/components/products/AdminProductsTable";
import { Button } from "~/components/ui/button/Button";
import { Container } from "~/components/ui/container/Container";
import AdminTable from "~/components/ui/table/AdminTable";

import { FolderPlus } from "lucide-react";
import { Flex } from "~/components/ui/flex/Flex";
import { Link } from "~/components/ui/link/Link";
import { Section } from "~/components/ui/section/Section";
import { TableCellAction } from "~/components/ui/table/Table";
import { categoryService } from "~/server/services/category.service";
import { Category } from "~/types/category";

const ACTIONS = {
  DELETE: "delete"
}

const initialLocationState = {
  breadcrumb: [{
    name: "Categories",
    path: ROUTE_PATH_ADMIN.CATEGORY_LIST
  }]
};

const columnHelper = createColumnHelper<Category>()

const columns = [
  columnHelper.accessor('name', {
    header: () => <span>Category name</span>,
    cell: props => {
      const location = useLocation();
      const breadcrumbState: Breadcrumb[] = location.state?.breadcrumb || initialLocationState?.breadcrumb || [];
      const subcategoryURL = `${ROUTE_PATH_ADMIN.CATEGORY_LIST}/${props.row.original.path as string}`;

      return (
        <Link
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
    header: () => <span>{t('ACTIONS')}</span>,
    cell: (props: CellContext<Category, unknown>) => {
      const location = useLocation();
      const slug = props.row.original.slug as string;
      const id = props.row.original.id?.toString() || "";
      const name = props.row.original.name as string;

      const editPath = `${ROUTE_PATH_ADMIN.CATEGORY_FORM}/${id}?referrer=${location.pathname}`;
      // const deletePath = `${ROUTE_PATH_ADMIN.CATEGORY_DELETE}/${id}?referrer=${location.pathname}`;

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
          formData.append("action", ACTIONS.DELETE);
          submit(formData, { method: "post", action: '?', navigate: false });
        }
      }

      return (
        <TableCellAction>
          <Button to={editPath} variant="outline" size='sm'>
            {t('EDIT')}
          </Button>
          <Button onClick={handleOnDelete} size='sm' aria-label="delete" disabled={isDisabled} variant="destructive">
            <Trash2 />
            <span className="sr-only">{t('DELETE')}</span>
          </Button>
        </TableCellAction>
      )
    }
  }),
]

export const loader = loaderAdminCategoriesList;

export const action: ActionFunction = async function actionAdminCategoriesDelete({ request }) {
  try {
    const data = await request.formData();
    const id = String(data.get('id'));
    const action = String(data.get('action'));

    if (action === ACTIONS.DELETE) {
      if (!id) {
        throw new Error('The id is required');
      }

      const deletedCategory = await categoryService.delete(id);
      return json({ ok: true, category: deletedCategory });
    }

    return json({ ok: false });
  } catch (error) {
    return json(error.message, { status: 404 });
  }
};

function AdminCategoriesList() {
  const { categories, category, breadcrumb, products } = useLoaderData<AdminCategoryLoaderList>() as AdminCategoryLoaderList;
  const location = useLocation();

  const editPath = category?.id ? `${ROUTE_PATH_ADMIN.CATEGORY_FORM}/${category.id}` : undefined;
  const newCategoryPath = {
    pathname: ROUTE_PATH_ADMIN.CATEGORY_FORM,
    search: category?.slug ? `?${CATEGORY_PARAMS.PARENT}=${category.slug}` : '',
  };
  const pathToNewProduct = {
    pathname: ROUTE_PATH_ADMIN.PRODUCT_FORM,
    search: category?.slug ? `?${PRODUCT_PARAMS.CATEGORY_ID}=${category.id}` : ''
  };

  return (
    <Section marginBottom>
      <Container>
        <Flex justify='between' align='center' style={{ marginTop: "2rem" }}>
          <h1 className="h1 text-2xl font-600 tracking-tight">{category?.name && <span>{category?.name} in</span>} {t("CATEGORY.CATEGORIES")}</h1>
        </Flex>
        <Flex justify='between' align='center'>
          <Flex className="left" wrap='wrap'>
            {breadcrumb &&
              <AdminCategoryBreadcrumb breadcrumb={breadcrumb} editPath={editPath} />}
          </Flex>
          <Flex justify='end'>
            <Button to={newCategoryPath} state={location.state} size="xs" variant='outline'>
              <FolderPlus size={16} /> {t('CATEGORY.NEW')}
            </Button>
            <Button to={pathToNewProduct} state={location.state} size="xs" variant='outline'>
              <FilePlus2 size={16} /> {t('PRODUCT.NEW')}
            </Button>
          </Flex>
        </Flex>
        <div className="admin-list mt-4">
          {categories.length > 0
            ? <AdminTable columns={columns} data={categories} caption="List of subcategories" />
            : <p className="box paper m-0">{t('CATEGORY.EMPTY')}</p>
          }
        </div>
        <div className="admin-list mt-4">
          {products.length > 0 && <AdminProductsTable data={products} />}
        </div>
      </Container>
    </Section>
  )
}

export default AdminCategoriesList
