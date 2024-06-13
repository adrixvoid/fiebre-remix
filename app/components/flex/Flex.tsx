import { cva, type VariantProps } from "class-variance-authority";

import styles from './Flex.module.css';

const cvaVariants = cva(
  styles.flex, {
  variants: {
    justify: {
      start: styles['justify-start'],
      end: styles['justify-end'],
      center: styles['justify-center'],
      between: styles['justify-between'],
    },
    align: {
      start: styles['align-start'],
      end: styles['align-end'],
      center: styles['align-center'],
    },
    direction: {
      row: styles.row,
      column: styles.column,
    }
  },
  defaultVariants: {
    justify: "start",
    direction: "row",
  },
})

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cvaVariants> { }

export function Flex({ className, justify, align, direction, ...props }: FlexProps) {
  return (
    <div className={cvaVariants({ justify, align, direction, className })} {...props} />
  );
}