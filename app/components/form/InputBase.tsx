import { cx } from "class-variance-authority";
import { Label } from "./Label";

import { forwardRef } from "react";
import { ErrorMessage } from "./ErrorMessage";

import styles from './InputBase.module.css';

export interface InputBaseProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: string;
}

const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  ({ label, labelProps, id, name, error, className, ...rest }, ref) => {
    return (
      <>
        {label && <Label id={id} name={name} {...labelProps}>{label}</Label>}
        <input ref={ref} className={cx(styles.input, className)} name={name} id={id} {...rest} />
        <ErrorMessage name={name} error={error} />
      </>
    )
  }
)


InputBase.displayName = "InputBase"

export { InputBase };

