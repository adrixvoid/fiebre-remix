import { useLoaderData } from "@remix-run/react";

import { ADMIN_ROUTE_PATH, CATEGORY_PARAMS } from "~/constants";

import { LoaderAdminCategoryList } from "../categories.controller";
import Button from "~/components/button/Button";
import AdminCategoryList from "./AdminCategoryList";
import AdminCategoryBreadcrumb from "./AdminCategoryBreadcrumb";
import { t } from "~/i18n/translate";

export default function AdminCategoriesLayout() {
    const { list, category, breadcrumb } = useLoaderData<LoaderAdminCategoryList>() as LoaderAdminCategoryList;

    const pathToNewProduct = {
        pathname: ADMIN_ROUTE_PATH.PRODUCT_CREATE,
        search: ''
    };

    const pathToNewCategory = {
        pathname: ADMIN_ROUTE_PATH.CATEGORY_CREATE,
        search: ''
    };

    if (category?.slug) {
        pathToNewCategory.search = `?${CATEGORY_PARAMS.PARENT}=${category.slug}`;
    }

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
                            ? <AdminCategoryList categories={list} />
                            : <p className="m-0">{t('CATEGORY.EMPTY')}</p>
                        }
                        <div className="h-4" />
                    </div>
                </div>
            </div>
        </section>
    )
}

// const { category, list } = useLoaderData<LoaderAdminCategoryList>() as LoaderAdminCategoryList;

//     const createCategoryPath = {
//         pathname: ADMIN_ROUTE_PATH.CATEGORY_CREATE,
//         search: `?${CATEGORY_PARAMS.PARENT}=${category.slug}`
//     };

//     return (
//         <section className="admin admin-categories">
//             <div className="container">
//                 <h1>Categorías</h1>
//                 <div className="box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <AdminCategoryBreadcrumb />
//                     <div className="admin-top">
//                         <Button to={createCategoryPath}>New Category</Button>
//                         <Button to={createCategoryPath}>New Product</Button>
//                     </div>
//                 </div>
//                 <div className="admin-list mt-2">
//                     <div>
//                         {list.length > 0
//                             ? <AdminCategoryList categories={list} />
//                             : <p className="m-0">No hay subcategorías agregadas</p>
//                         }
//                         <div className="h-4" />
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )