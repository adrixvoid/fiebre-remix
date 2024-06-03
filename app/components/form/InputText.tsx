import { cx } from "class-variance-authority";
import Label from "./Label";

export interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: string;
}

export function InputText({ label, labelProps, id, name, error, className, ...rest }: InputTextProps) {
  return (
    <>
      {label && <Label id={id} name={name} {...labelProps}>{label}</Label>}
      <input className={cx('w-full', className)} name={name} id={id} {...rest} />
      {Boolean(error) && <p className="w-full box paper color-danger">{error}</p>}
    </>
  )
}

export default InputText;
