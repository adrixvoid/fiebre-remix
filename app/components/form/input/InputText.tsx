export interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: string;
}

export function InputText({ label, labelProps, id, name, error, ...rest }: InputTextProps) {
  return (
    <>
      {label && <label htmlFor={String(id ? id : name)} {...labelProps}>{label}</label>}
      <input name={name} id={id} {...rest} />
      {Boolean(error) && <p className="box paper color-danger">{error}</p>}
    </>
  )
}

export default InputText;
