import clsx from "clsx";
import { forwardRef } from "react";
import { Label } from "../form/Label";

import { ChevronDown } from "lucide-react";
import { ErrorMessage, InputErrorMessage } from "./ErrorMessage";
import styles from './Select.module.css';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: InputErrorMessage;
  defaultValue?: string | undefined
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, labelProps, id, name, error, className, ...rest }, ref) => {
  return (
    <>
      {label && <Label id={id || name} name={name} {...labelProps}>{label}</Label>}
      <div className={styles["select-wrapper"]}>
        <select ref={ref} id={id || name} name={name} className={clsx(styles.select, className)} {...rest} />
        <ChevronDown className={styles.icon} />
      </div>
      <ErrorMessage name={name} error={error} />
    </>
  )
})
