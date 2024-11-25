import { Slot } from "@radix-ui/react-slot";

import Input, { InputProps } from "./Input";

export function ValidateInput({ name, className, onChange, onBlur, ...rest }: InputProps & { name: string } & { [key: string]: any }) {
  console.log("ValidateInput rest", rest)
  // const field = useField(name, {
  //   validationBehavior: {
  //     initial: "onBlur",
  //     whenTouched: "onChange",
  //     whenSubmitted: "onChange",
  //   },
  // });

  const overwriteProps = {
    ...rest,
    // error: field.error,
    // onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
    //   if (!field.touched) {
    //     field.setTouched(true);
    //   } else {
    //     if (field.error) field.clearError();
    //     field.validate()
    //   }
    //   onChange?.(event);
    // },
    // onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => {
    //   field.validate()
    //   onBlur?.(event);
    // },
    // className: clsx({ 'error': Boolean(field.error) }, className)
  }

  const Comp = Slot || Input

  return <Comp  {...overwriteProps} />;
}

export default ValidateInput;
