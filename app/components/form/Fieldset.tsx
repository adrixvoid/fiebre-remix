import clsx from 'clsx';
import styles from './Fieldset.module.css';

export const Fieldset = ({ className, ...props }: React.FieldsetHTMLAttributes<HTMLFieldSetElement>) => {
  return <fieldset className={clsx(styles.base, className)} {...props} />
}
