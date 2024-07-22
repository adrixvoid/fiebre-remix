import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import styles from './Header.module.css';

const cvaVariants = cva(
  styles.header, {
  variants: {
    position: {
      static: styles.static,
      sticky: styles.sticky,
      fixed: styles.fixed,
      absolute: styles.absolute
    }
  }
})

export interface FlexProps extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cvaVariants> { }

export const Header = forwardRef<HTMLElement, FlexProps>(({ className, position, ...props }, ref) => {
  return (
    <header ref={ref} className={cvaVariants({ className, position })} {...props} />
  );
})