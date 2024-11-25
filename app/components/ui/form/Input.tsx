import { forwardRef } from "react";
import { InputBase, InputBaseProps } from "./InputBase";
import InputCheckbox, { InputCheckboxProps } from "./InputCheckbox";

export type InputProps = InputCheckboxProps | InputBaseProps | React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  switch (props.type) {
    case 'checkbox':
    case 'radio':
      return <InputCheckbox ref={ref} {...props} label={props.label || ''} />;
    default:
      return <InputBase ref={ref} {...props} />;
  }
})

export default Input;
