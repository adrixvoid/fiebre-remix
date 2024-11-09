
import clsx from "clsx";
import styles from './Label.module.css';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  name?: string;
  type?: "checkbox"
}

function Label({ id, name, className, type, ...rest }: LabelProps) {
  return (
    <label
      className={clsx(className, styles.label)}
      htmlFor={type !== "checkbox" ? String(id ? id : name) : undefined}
      {...rest}
    />
  )
}

Label.displayName = "Label"

export { Label };

