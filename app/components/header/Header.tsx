import { cva, type VariantProps } from "class-variance-authority";

import styles from './Header.module.css';

const cvaVariants = cva(
  styles.header, {
  variants: {
    position: {
      static: styles.static,
      sticky: styles.sticky,
      fixed: styles.fixed
    }
  }
})

export interface FlexProps extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cvaVariants> { }

export function Header({ className, position, ...props }: FlexProps) {
  return (
    <header className={cvaVariants({ className, position })} {...props} />
  );
}