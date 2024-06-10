import cx from 'clsx';
import cva from 'class-variance-authority';
import { Label } from './Label';
import { forwardRef } from 'react';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, labelProps, id, name, error, className, ...rest }, ref) => {
    return (
      <>
        {label && <Label id={id} name={name} {...labelProps}>{label}</Label>}
        <textarea ref={ref} id={id} name={name} {...rest} />
        {Boolean(error) && <p className="box paper color-danger">{error}</p>}
      </>
    )
  });

export default TextArea;
