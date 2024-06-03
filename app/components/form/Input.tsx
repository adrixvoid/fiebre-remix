import InputCheckbox, { InputCheckboxProps } from "./InputCheckbox";
import InputText, { InputTextProps } from "./InputText";
import InputFilePreview from "~/components/form/input-file-preview/InputFilePreview";

export type InputProps = InputCheckboxProps | InputTextProps | React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export function Input(props: InputProps) {
  switch (props.type) {
    case 'checkbox':
    case 'radio':
      return <InputCheckbox {...props} label={props.label || ''} />;
    case 'text':
      return <InputText {...props} />;
    case 'file':
      return <InputText {...props} />;
    case 'file-preview':
      return <InputFilePreview {...props} type="file" />;
    default:
      return <input {...props} />;
  }
}

export default Input;
