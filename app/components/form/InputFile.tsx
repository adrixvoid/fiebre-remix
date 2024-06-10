import { Label } from "./Label";

export interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: string;
}

export function InputFile({ label, labelProps, id, name, error, className, ...rest }: InputFileProps) {
  return (
    <>
      {label && <Label id={id} name={name} {...labelProps}>{label}</Label>}
      <input type='file' id={id} {...rest} />
      {Boolean(error) && <p className="box paper color-danger">{error}</p>}
    </>
  )
}

export default InputFile;