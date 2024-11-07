import clsx from "clsx";
import { Label } from "../form/Label";

import { ChevronDown } from "lucide-react";
import { ErrorMessage } from "./ErrorMessage";
import styles from './Select.module.css';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: string;
  defaultValue?: string | undefined
}

export function Select({ label, labelProps, id, name, error, className, ...rest }: SelectProps) {
  return (
    <>
      {label && <Label id={id || name} name={name} {...labelProps}>{label}</Label>}
      <div className={styles["select-wrapper"]}>
        <select id={id || name} name={name} className={clsx(styles.select, className)} {...rest} />
        <ChevronDown className={styles.icon} />
      </div>
      <ErrorMessage name={name} error={error} />
    </>
  )
}
