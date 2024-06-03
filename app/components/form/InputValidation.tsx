import { useField } from "remix-validated-form";
import { Slot } from "@radix-ui/react-slot"
import clsx from 'clsx';

import Input, { InputProps } from "./Input";

export function InputValidation({ name, className, onChange, onBlur, asChild, ...rest }: InputProps & { name: string } & { asChild?: boolean } & { [key: string]: any }) {
  const field = useField(name);

  const props = {
    name,
    error: field.error,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!field.touched) {
        field.setTouched(true);
      } else {
        if (field.error) field.clearError();
        field.validate()
      }
      onChange?.(event);
    },
    onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => {
      field.validate()
      onBlur?.(event);
    },
    className: clsx({ 'error': Boolean(field.error) }, className)
  }

  const Comp = asChild ? Slot : Input

  return <Comp {...field.getInputProps()} {...rest} {...props} />;
}

export default InputValidation;
