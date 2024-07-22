import { cva, type VariantProps } from "class-variance-authority";

import styles from './Grid.module.css';

const cvaVariants = cva(
  styles.grid, {
  variants: {
    columns: {
      default: styles.three,
      two: styles.two,
      masonry: [styles.masonry]
    }
  },
  defaultVariants: {
    columns: "default",
  },
})


export interface GridProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cvaVariants> { }

export function Grid({ className, columns, ...props }: GridProps) {
  return (
    <div className={cvaVariants({ columns, className })} {...props} />
  );
}
