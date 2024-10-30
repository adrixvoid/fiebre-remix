import { Fragment } from "react/jsx-runtime";

import { ROUTE_PATH_ADMIN } from "~/constants";
import { Breadcrumb } from "~/types/breadcrumb";

import { Link } from "~/components/ui/link/Link";

import style from './AdminCategoryBreadcrumb.module.css';

function AdminCategoryBreadcrumb({ breadcrumb = [], editPath }: { breadcrumb: Breadcrumb[], editPath?: string }) {
    return (
        <nav className={style.base}>
            <Link to={ROUTE_PATH_ADMIN.CATEGORY_LIST}>Categories</Link>
            {breadcrumb?.map((b) => (
                <Fragment key={b.path}>
                    <span className={style.separator}>/</span>
                    {b.isActive ? b.name : (
                        <Link to={`${ROUTE_PATH_ADMIN.CATEGORY_LIST}/${b.path}`}>{b.name}</Link>
                    )}
                </Fragment>
            ))}
            {editPath && <span className={style.small}>(<Link className={style.current} to={editPath}>Edit</Link>)</span>}
        </nav>
    )
}

export default AdminCategoryBreadcrumb
