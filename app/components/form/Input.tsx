import InputCheckbox, { InputCheckboxProps } from "./InputCheckbox";
import { InputBase, InputBaseProps } from "./InputBase";

export type InputProps = InputCheckboxProps | InputBaseProps | React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export function Input(props: InputProps) {
  switch (props.type) {
    case 'checkbox':
    case 'radio':
      return <InputCheckbox {...props} label={props.label || ''} />;
    default:
      return <InputBase {...props} />;
  }
}

export default Input;
