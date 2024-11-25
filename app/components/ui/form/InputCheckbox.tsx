import clsx from "clsx";
import React, { forwardRef } from "react";
import { ErrorMessage, InputErrorMessage } from "./ErrorMessage";
import { Label } from "./Label";

import styles from './InputCheckbox.module.css';

export interface InputCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: InputErrorMessage;
}

export const InputCheckbox = forwardRef<HTMLInputElement, InputCheckboxProps>(({ label, labelProps, id, name, type, error, className, ...rest }, ref) => {
  return (
    <>
      <Label name={name} {...labelProps} className={clsx(styles.label, labelProps?.className)} type="checkbox">
        <input
          ref={ref}
          className={clsx(
            className,
            styles.base, {
            [styles.checkbox]: type === "checkbox",
            [styles.radio]: type === "radio"
          })}
          type={type || "checkbox"}
          name={name}
          {...rest}
        />
        {label}
      </Label>
      <ErrorMessage name={name} error={error} />
    </>
  )
})

export default InputCheckbox;