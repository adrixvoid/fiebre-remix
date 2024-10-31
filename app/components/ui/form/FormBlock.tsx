import { cva, type VariantProps } from "class-variance-authority";

import styles from './FormBlock.module.css';

const formBlockVariants = cva(
  styles.base, {
  variants: {
    variant: {
      block: styles.block,
      inline: styles.inline,
    },
    width: {
      fixed: styles.fixedWidth,
      full: styles.fullWidth
    }
  },
  defaultVariants: {
    variant: "block",
    width: "fixed"
  },
})

interface FormBlockProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof formBlockVariants> { }

export const FormBlock = ({ variant, className, ...props }: FormBlockProps) => {
  return <div className={formBlockVariants({ variant, className })} {...props} />
}
