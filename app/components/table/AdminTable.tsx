import { flexRender, getCoreRowModel, TableOptions, useReactTable } from '@tanstack/react-table'
import cx from 'classnames'

export type ColumnMap = { [key: string]: object };

const defaultColumn = {
  size: 90, //starting column size
  minSize: 50, //enforced during column resizing
  maxSize: 200, //enforced during column resizing
};

const getColumnClassName = (columnClassName?: ColumnMap, columnId?: string) => cx(
  columnClassName && columnId && columnClassName[columnId], {
  'text-end': columnId === 'actions',
  'column-actions': columnId === 'actions',
});
const getColumnStyle = (columnStyles?: ColumnMap, columnId?: string) => (columnStyles && columnId) ? columnStyles[columnId] : {}

interface AdminTable<TData> extends Omit<TableOptions<TData>, 'getCoreRowModel'> {
  columnStyles?: ColumnMap
  columnClassName?: ColumnMap
}

export default function AdminTable<TData>({ columns, data, columnClassName, columnStyles }: AdminTable<TData>) {
  const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel(), defaultColumn })

  return (
    <table className="table">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}
                className={getColumnClassName(columnClassName, header.column.id)}
                style={getColumnStyle(columnStyles, header.column.id)}
              >
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
              <td key={cell.id} className={getColumnClassName(columnClassName, cell.column.id)}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
