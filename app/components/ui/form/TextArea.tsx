import clsx from 'clsx';
import { forwardRef } from 'react';
import { Label } from './Label';

import { ErrorMessage } from './ErrorMessage';

import inputStyles from './InputBase.module.css';
import styles from "./TextArea.module.css";

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
        <textarea ref={ref} id={id} name={name} className={clsx(inputStyles.input, styles.base, className)} {...rest} />
        <ErrorMessage name={name} error={error} />
      </>
    )
  });

export default TextArea;
