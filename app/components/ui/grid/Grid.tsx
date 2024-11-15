import { cva, type VariantProps } from "class-variance-authority";

import styles from './Grid.module.css';

const cvaVariants = cva(
  styles.grid, {
  variants: {
    columns: {
      '2': styles.two,
      '3': styles.three,
      '4': styles.four,
      masonry: [styles.masonry]
    }
  },
  defaultVariants: {
    columns: '3',
  },
})


export interface GridProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cvaVariants> { }

export function Grid({ className, columns, ...props }: GridProps) {
  return (
    <div className={cvaVariants({ columns, className })} {...props} />
  );
}
