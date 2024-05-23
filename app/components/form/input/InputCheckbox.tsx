export interface InputCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: string;
}

export function InputCheckbox({ label, labelProps, id, name, type, error, className, ...rest }: InputCheckboxProps) {
  return (
    <>
      <label htmlFor={String(id ? id : name)} {...labelProps}>
        <input type={type || "checkbox"} name={name} id={id ? id : name} {...rest} />
        {label}
      </label>
      {Boolean(error) && <p className="box text-destructive">{error}</p>}
    </>
  )
}

export default InputCheckbox;