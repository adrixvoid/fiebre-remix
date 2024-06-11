import { cva, type VariantProps } from "class-variance-authority"

import styles from './Container.module.css'

const cvaVariants = cva(
  styles.container, {
  variants: {
    variant: {
      default: "",
      fluid: styles.fluid
    }
  },
  defaultVariants: {
    variant: "default",
  },
})


export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cvaVariants> { }

export function Container({ className, variant, ...props }: ContainerProps) {
  return (
    <div className={cvaVariants({ variant, className })} {...props} />
  );
}