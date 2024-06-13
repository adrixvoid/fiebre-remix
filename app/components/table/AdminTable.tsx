import { flexRender, getCoreRowModel, TableOptions, useReactTable } from '@tanstack/react-table'
import cx from 'clsx'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/table/Table"

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
  caption?: string;
  columnStyles?: ColumnMap;
  columnClassName?: ColumnMap;
}

export default function AdminTable<TData>({ columns, data, caption, columnClassName, columnStyles }: AdminTable<TData>) {
  const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel(), defaultColumn })

  return (
    <div className='rounded-md border'>
      <Table>
        {caption && <TableCaption className='border-t p-1'>{caption}</TableCaption>}
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}
                  className={getColumnClassName(columnClassName, header.column.id)}
                  style={getColumnStyle(columnStyles, header.column.id)}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} className={getColumnClassName(columnClassName, cell.column.id)}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
