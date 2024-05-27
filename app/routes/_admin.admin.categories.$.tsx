import { useLoaderData } from "@remix-run/react";

import { ADMIN_ROUTE_PATH } from "~/constants";
import { t } from "~/i18n/translate";

import useLocationState from "~/hooks/useLocationState";

import { loaderAdminCategoriesList } from "~/server/controllers/categories.controller";
import { AdminCategoryLoaderList, CATEGORY_PARAMS } from "~/server/controllers/categories.controller";
import { PRODUCT_PARAMS } from "~/server/controllers/products.controller";

import Button from "~/components/button/Button";
import AdminCategoryBreadcrumb from "~/components/categories/AdminCategoryBreadcrumb";
import AdminCategoryTable from "~/components/categories/AdminCategoryTable";
import AdminProductsTable from "~/components/products/AdminProductsTable";

export const loader = loaderAdminCategoriesList;

function AdminCategoriesList() {
  const { list, category, breadcrumb, products } = useLoaderData<AdminCategoryLoaderList>() as AdminCategoryLoaderList;
  const { getLocationStateReferrer } = useLocationState();

  const editPath = category?.id ? `${ADMIN_ROUTE_PATH.CATEGORY_EDIT}/${category.id}` : undefined;
  const newCategoryPath = {
    pathname: ADMIN_ROUTE_PATH.CATEGORY_CREATE,
    search: category?.slug ? `?${CATEGORY_PARAMS.PARENT}=${category.slug}` : '',
  };
  const pathToNewProduct = {
    pathname: ADMIN_ROUTE_PATH.PRODUCT_CREATE,
    search: category?.slug ? `?${PRODUCT_PARAMS.CATEGORY_ID}=${category._id}` : ''
  };
  const locationWithReferrer = getLocationStateReferrer()

  console.log("editPath", editPath)

  return (
    <section className="admin admin-categories">
      <div className="container">
        <div className="flex justify-between">
          <h1 className="h1">{category?.name && <span>{category?.name} in</span>} {t("CATEGORY.CATEGORIES")}</h1>
          {category?.image && <img className="admin-banner-preview rounded-md" src={category?.image.url} />}
        </div>
        <div className="box paper admin-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="left">
            {breadcrumb &&
              <AdminCategoryBreadcrumb breadcrumb={breadcrumb} editPath={editPath} />}
          </div>
          <div className="right">
            <div className="actions flex" style={{ gap: "0.5rem" }}>
              <Button to={newCategoryPath} state={locationWithReferrer}>{`➕ ${t('CATEGORY.SUBCATEGORY')}`}</Button>
              <Button to={pathToNewProduct} state={locationWithReferrer}>{t('PRODUCT.NEW')}</Button>
            </div>
          </div>
        </div>
        <div className="admin-list mt-4">
          {list.length > 0
            ? <AdminCategoryTable categories={list} />
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
