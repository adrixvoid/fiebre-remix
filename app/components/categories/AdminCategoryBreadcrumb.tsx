import { Fragment } from "react/jsx-runtime";
import { Link } from "@remix-run/react";

import { ADMIN_ROUTE_PATH } from "~/constants";
import { Breadcrumb } from "~/types/global.type";

function AdminCategoryBreadcrumb({ breadcrumb, editPath }: { breadcrumb: Breadcrumb[], editPath?: string }) {
    return (
        <nav className="navigation-back">
            <Link to={ADMIN_ROUTE_PATH.CATEGORY_LIST}>Categories</Link>
            &nbsp;/&nbsp;
            {breadcrumb?.map((b, index) => (
                <Fragment key={b.path}>
                    {index !== 0 && ' / '}
                    {b.isActive ? b.name : (
                        <Link to={`${ADMIN_ROUTE_PATH.CATEGORY_LIST}/${b.path}`}>{b.name}</Link>
                    )}
                </Fragment>
            ))}
            {editPath && <>&nbsp;</>}
            {editPath && <span className="text-sm">(<Link className="text-sm" to={editPath}>Edit</Link>)</span>}
        </nav>
    )
}

export default AdminCategoryBreadcrumb
