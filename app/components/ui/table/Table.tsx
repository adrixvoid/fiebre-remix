import * as React from "react";

import clsx from "clsx";
import styles from "./Table.module.css";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className={styles['table-wrapper']}>
    <table
      ref={ref}
      className={clsx(styles.table, className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={clsx(styles.header, className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={clsx(styles.body, className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={clsx(
      styles.footer,
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={clsx(
      styles.row,
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={clsx(
      styles.head,
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableHeadAction = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={clsx(
      styles["head-action"],
      className
    )}
    {...props}
  />
))
TableHeadAction.displayName = "TableHeadAction"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={clsx(
      styles.cell,
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCellAction = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      styles["cell-action"],
      className
    )}
    {...props}
  />
))
TableCellAction.displayName = "TableCellAction"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={clsx(styles.caption, className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table, TableBody, TableCaption, TableCell,
  TableCellAction, TableFooter,
  TableHead,
  TableHeadAction, TableHeader, TableRow
};

