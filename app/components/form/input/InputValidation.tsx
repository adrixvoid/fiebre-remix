import { useField } from "remix-validated-form";
import cx from 'classnames';

import Input, { InputProps } from "./Input";

export function InputValidation({ name, className, onChange, onBlur, ...rest }: InputProps & { name: string }) {
  const field = useField(name);

  const props = {
    name,
    error: field.error,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!field.touched) {
        field.setTouched(true);
      } else {
        field.validate()
      }
      onChange?.(event);
    },
    onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => {
      field.validate()
      onBlur?.(event);
    },
    className: cx(className, { 'error': Boolean(field.error) })
  }

  return <Input {...rest} {...field.getInputProps()} {...props} />;
}

export default InputValidation;
