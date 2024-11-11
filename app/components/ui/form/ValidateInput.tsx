import { Slot } from "@radix-ui/react-slot";
import clsx from 'clsx';
import { useField } from "remix-validated-form";

import Input, { InputProps } from "./Input";

export function ValidateInput({ name, className, onChange, onBlur, ...rest }: InputProps & { name: string } & { [key: string]: any }) {
  const field = useField(name);

  const overwriteProps = {
    ...rest,
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

  const Comp = Slot || Input

  return <Comp {...field.getInputProps()} {...overwriteProps} />;
}

export default ValidateInput;
