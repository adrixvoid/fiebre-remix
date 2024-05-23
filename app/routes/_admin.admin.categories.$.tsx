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

export const loader = loaderAdminCategoriesList;

function AdminCategoriesList() {
  const { list, category, breadcrumb } = useLoaderData<AdminCategoryLoaderList>() as AdminCategoryLoaderList;
  const { getLocationStateReferrer } = useLocationState();

  const newCategoryPath = {
    pathname: ADMIN_ROUTE_PATH.CATEGORY_CREATE,
    search: category?.slug ? `?${CATEGORY_PARAMS.PARENT}=${category.slug}` : '',
  };
  const pathToNewProduct = {
    pathname: ADMIN_ROUTE_PATH.PRODUCT_CREATE,
    search: category?.slug ? `?${PRODUCT_PARAMS.CATEGORY_ID}=${category._id}` : ''
  };
  const locationWithReferrer = getLocationStateReferrer()

  return (
    <section className="admin admin-categories">
      <div className="container">
        <h1 className="h4">{t("CATEGORY.ADD")}</h1>
        {category?.name && <h1 className="h1">{category?.name}</h1>}
        {category?.image && <img className="thumbnail" src={category?.image.url} />}
        <div className="box admin-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="left">
            {breadcrumb &&
              <AdminCategoryBreadcrumb breadcrumb={breadcrumb} />}
          </div>
          <div className="right">
            <div className="actions flex" style={{ gap: "0.5rem" }}>
              <Button to={newCategoryPath} state={locationWithReferrer}>{t('CATEGORY.NEW')}</Button>
              <Button to={pathToNewProduct} state={locationWithReferrer}>{t('PRODUCT.NEW')}</Button>
            </div>
          </div>
        </div>
        <div className="admin-list mt-2">
          <div>
            {list.length > 0
              ? <AdminCategoryTable categories={list} />
              : <p className="m-0">{t('CATEGORY.EMPTY')}</p>
            }
            <div className="h-4" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminCategoriesList
