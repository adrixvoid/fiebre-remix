import { useLoaderData } from "@remix-run/react";

import { ADMIN_ROUTE_PATH } from "~/constants";

import { loaderAdminProductList } from "~/server/controllers/products.controller";
import Button from "~/components/button/Button";

import { t } from "~/i18n/translate";
import { AdminCategoryLoaderList, CATEGORY_PARAMS } from "~/server/controllers/categories.controller";
import AdminCategoryBreadcrumb from "~/components/categories/AdminCategoryBreadcrumb";
import AdminCategoryTable from "~/components/categories/AdminCategoryTable";

export const loader = loaderAdminProductList;

export default function AdminProductList() {
  const { list, category, breadcrumb } = useLoaderData<AdminCategoryLoaderList>() as AdminCategoryLoaderList;

  const pathToNewProduct = {
    pathname: ADMIN_ROUTE_PATH.PRODUCT_CREATE,
    search: ''
  };

  const pathToNewCategory = {
    pathname: ADMIN_ROUTE_PATH.CATEGORY_CREATE,
    search: category?.slug ? `?${CATEGORY_PARAMS.PARENT}=${category.slug}` : ''
  };

  return (
    <section className="admin admin-categories">
      <div className="container">
        <h1 className="h4">{t("CATEGORY.ADD")}</h1>
        {category?.name && <h1 className="h1">{category?.name}</h1>}
        <div className="box admin-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="left">
            {breadcrumb &&
              <AdminCategoryBreadcrumb breadcrumb={breadcrumb} />}
          </div>
          <div className="right">
            <div className="actions flex" style={{ gap: "0.5rem" }}>
              <Button to={pathToNewCategory}>{t('CATEGORY.NEW')}</Button>
              <Button to={pathToNewProduct}>{t('PRODUCT.NEW')}</Button>
            </div>
          </div>
        </div>
        <div className="admin-list mt-2">
          <div>
            {list.length > 0
              ? <AdminCategoryTable categories={list} />
              : <p className="m-0">{t('CATEGORY.EMPTY')}</p>
            }
          </div>
        </div>
      </div>
    </section>
  )
}

