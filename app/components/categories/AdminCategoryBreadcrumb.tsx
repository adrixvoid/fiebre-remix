import { Fragment } from "react/jsx-runtime";
import { ADMIN_ROUTE_PATH } from "~/constants";
import { Breadcrumb } from "~/types/global.type";
import { Link } from "~/components/link/Link";

function AdminCategoryBreadcrumb({ breadcrumb = [], editPath }: { breadcrumb: Breadcrumb[], editPath?: string }) {
    return (
        <nav className="navigation-back">
            <Link className="underline-offset-4 hover:underline" to={ADMIN_ROUTE_PATH.CATEGORY_LIST}>Categories</Link>
            &nbsp;/&nbsp;
            {breadcrumb?.map((b, index) => (
                <Fragment key={b.path}>
                    {index !== 0 && ' / '}
                    {b.isActive ? b.name : (
                        <Link className="underline-offset-4 hover:underline" to={`${ADMIN_ROUTE_PATH.CATEGORY_LIST}/${b.path}`}>{b.name}</Link>
                    )}
                </Fragment>
            ))}
            {editPath && <>&nbsp;</>}
            {editPath && <>(<Link className="text-sm underline-offset-4 hover:underline" to={editPath}>Edit</Link>)</>}
        </nav>
    )
}

export default AdminCategoryBreadcrumb
