import cx from 'clsx';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  name?: string;
}

export function Label({ children, id, name, className, ...rest }: LabelProps) {
  return (
    <label className={cx("w-full mb-2", className)} htmlFor={String(id ? id : name)} {...rest}>
      {children}
    </label>
  )
}

export default Label;
