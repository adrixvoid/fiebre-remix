import cx from 'classnames';
import { useField } from "remix-validated-form";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: string;
}

export function TextArea({ label, labelProps, id, name, error, className, onChange, onBlur, ...rest }: TextAreaProps) {
  const field = useField(name);

  const props = {
    id: id ? id : name,
    name,
    className: cx(className, Boolean(error) ? 'error' : ''),
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (field.error) field.clearError();
      onChange?.(event);
    },
    onBlur: (event: React.FocusEvent<HTMLTextAreaElement, Element>) => {
      field.validate()
      onBlur?.(event);
    }
  }

  return (
    <>
      {label && <label htmlFor={String(id ? id : name)} {...labelProps}>{label}</label>}
      <textarea
        {...rest}
        {...field.getInputProps()}
        {...props}
      />
      {field.error && <p className="box paper color-danger">{field.error}</p>}
    </>
  )
}

export default TextArea;
