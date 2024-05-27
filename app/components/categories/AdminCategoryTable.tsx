import { Link, useLocation } from "@remix-run/react";
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { CategoryDocument } from "~/server/schema/category.schema";
import { ADMIN_ROUTE_PATH } from "~/constants";
import ButtonActions from "./AdminCategoryActions";
import { t } from "~/i18n/translate";
import AdminTable from "../table/AdminTable";

const initialState = [{
    name: "Categories",
    url: ADMIN_ROUTE_PATH.CATEGORY_LIST
}];

const columnHelper = createColumnHelper<CategoryDocument>()

const columns = [
    columnHelper.accessor('name', {
        header: () => <span>Category</span>,
        cell: props => {
            const location = useLocation();
            const locationPath = location?.state?.path || initialState;
            const to = `${ADMIN_ROUTE_PATH.CATEGORY_LIST}/${props.row.original.path as string}`;

            return (
                <Link
                    to={to}
                    state={{
                        path: [
                            ...locationPath,
                            {
                                name: props.getValue(),
                                url: to
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
        header: () => <span>{t('TABLE.ACTIONS')}</span>,
        cell: (props) => <ButtonActions {...props} />
    }),
]

export default function AdminCategoryList({ categories = [] }: { categories: CategoryDocument[] }) {
    const table = useReactTable({ columns, data: categories as CategoryDocument[], getCoreRowModel: getCoreRowModel() })
    return <AdminTable columns={columns} data={categories} />
}
