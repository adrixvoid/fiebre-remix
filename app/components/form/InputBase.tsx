import { cx } from "class-variance-authority";
import { Label } from "./Label";

import styles from './InputBase.module.css'
import { forwardRef } from "react";

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
        {Boolean(error) && <label className={styles.error}>{error}</label>}
      </>
    )
  }
)


InputBase.displayName = "InputBase"

export { InputBase }
