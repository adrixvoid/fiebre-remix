import { Label } from "./Label";

export interface InputCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: string;
}

export function InputCheckbox({ label, labelProps, id, name, type, error, className, ...rest }: InputCheckboxProps) {
  return (
    <>
      <Label id={id} name={name} {...labelProps}>
        <input type={type || "checkbox"} name={name} id={id ? id : name} {...rest} />
        {label}
      </Label>
      {Boolean(error) && <p className="box paper text-destructive">{error}</p>}
    </>
  )
}

export default InputCheckbox;