import clsx from "clsx";
import { Label } from "../form/Label";

import styles from './Select.module.css'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: string;
  defaultValue?: string | undefined
}

export function Select({ label, labelProps, id, name, error, children, className, ...rest }: SelectProps) {
  const css = clsx(
    styles.select,
    className
  );
  return (
    <>
      {label && <Label id={id} name={name} {...labelProps}>{label}</Label>}
      <select id={id} name={name} className={css} {...rest}>
        {children}
      </select>
      <select className={"flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"} {...rest}>
        {children}
      </select>
      {Boolean(error) && <p className="box paper color-danger">{error}</p>}
    </>
  )
}
