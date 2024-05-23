export interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: string;
}

export function InputFile({ label, labelProps, id, name, error, className, ...rest }: InputFileProps) {
  return (
    <>
      {label && <label htmlFor={String(id ? id : name)} {...labelProps}>{label}</label>}
      <input type='file' id={id} {...rest} />
      {Boolean(error) && <p className="box color-danger">{error}</p>}
    </>
  )
}

export default InputFile;