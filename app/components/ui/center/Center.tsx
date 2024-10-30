import { cva, type VariantProps } from "class-variance-authority";

import styles from './Center.module.css';

const cvaVariants = cva(
  null, {
  variants: {
    variant: {
      flex: styles.flex,
      text: styles['center-text'],
      all: [styles.flex, styles['center-text']]
    },
    direction: {
      row: styles.row,
      column: styles.column,
    }
  },
  defaultVariants: {
    variant: "flex",
    direction: "row",
  },
})

export interface CenterProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cvaVariants> { }

export function Center({ className, variant, direction, ...props }: CenterProps) {
  return (
    <div className={cvaVariants({ variant, direction, className })} {...props} />
  );
}