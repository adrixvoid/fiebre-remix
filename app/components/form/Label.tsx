import cx from 'clsx';
import { cva, type VariantProps } from "class-variance-authority"

import styles from './Label.module.css'

const labelVariants = cva(styles.label)

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  name?: string;
}

function Label({ id, name, className, ...rest }: LabelProps & VariantProps<typeof labelVariants>) {
  return (
    <label
      className={cx(labelVariants(), className)}
      htmlFor={String(id ? id : name)}
      {...rest}
    />
  )
}

Label.displayName = "Label"

export { Label }
