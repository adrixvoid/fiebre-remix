import { Fragment } from "react/jsx-runtime";
import { Link } from "@remix-run/react";

import { ADMIN_ROUTE_PATH } from "~/constants";
import { type LoaderAdminCategoryList } from "../categories.controller";

function AdminCategoryBreadcrumb({ breadcrumb }: { breadcrumb: LoaderAdminCategoryList['breadcrumb'] }) {
    const links = breadcrumb?.map((b, index) => (
        <Fragment key={b.path}>
            {index !== 0 && ' / '}
            {b.active ? b.name : (
                <Link to={`${ADMIN_ROUTE_PATH.CATEGORY_LIST}/${b.path}`}>{b.name}</Link>
            )}
        </Fragment>
    ))

    return (
        <nav className="navigation-back">
            <Link to={ADMIN_ROUTE_PATH.CATEGORY_LIST}>Categories</Link>
            &nbsp;/&nbsp;
            {links}
        </nav>
    )
}

export default AdminCategoryBreadcrumb
