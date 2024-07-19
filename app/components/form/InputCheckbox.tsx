import clsx from "clsx";
import React from "react";
import { ErrorMessage } from "./ErrorMessage";
import { Label } from "./Label";

import styles from './InputCheckbox.module.css';

export interface InputCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: string;
}

export function InputCheckbox({ label, labelProps, id, name, type, error, className, ...rest }: InputCheckboxProps) {
  return (
    <>
      <Label className={styles.label} id={id} name={name} {...labelProps}>
        <input className={clsx(
          className,
          styles.base, {
          [styles.checkbox]: type === "checkbox",
          [styles.radio]: type === "radio"
        })}
          type={type || "checkbox"}
          name={name}
          id={id ? id : name}
          {...rest}
        />
        {label}
      </Label>
      <ErrorMessage name={name} error={error} />
    </>
  )
}

export default InputCheckbox;