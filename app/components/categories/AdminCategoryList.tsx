import { Link, useLocation } from "@remix-run/react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import cx from 'classnames'

import { CategoryDocument } from "~/server/database/schema/category.schema";
import { ADMIN_ROUTE_PATH } from "~/constants";
import ButtonActions from "./AdminCategoryActions";
import { t } from "~/i18n/translate";

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
        header: () => <span>{t('CATEGORY.TABLE.ACTIONS')}</span>,
        cell: (props) => <ButtonActions {...props} />
    }),
]

interface AdminCategoriesProps {
    categories: CategoryDocument[]
}

export default function AdminCategoryList({ categories = [] }: AdminCategoriesProps) {
    const table = useReactTable({ columns, data: categories as CategoryDocument[], getCoreRowModel: getCoreRowModel() })
    const getClassName = (columnId: string) => cx({
        'text-align-right': columnId === 'actions',
        'column-actions': columnId === 'actions'
    })

    return (
        <table className="table">
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className={getClassName(header.column.id)}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className={getClassName(cell.column.id)}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}