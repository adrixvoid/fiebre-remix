import { ErrorMessage } from "./ErrorMessage";
import { Label } from "./Label";

import clsx from "clsx";
import styles from './InputFile.module.css';

export interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: string;
}

export function InputFile({ label, labelProps, id, name, error, className, ...rest }: InputFileProps) {
  return (
    <>
      {label && <Label id={id} name={name} {...labelProps}>{label}</Label>}
      <input type='file' id={id} {...rest} className={clsx(styles.file, className)} />
      <ErrorMessage name={name} error={error} />
    </>
  )
}

export default InputFile;