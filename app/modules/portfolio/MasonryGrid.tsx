import { cva, type VariantProps } from "class-variance-authority"

import styles from './MasonryGrid.module.css'

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


export interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cvaVariants> { }

export function MasonryGrid({ className, columns, ...props }: MasonryGridProps) {
  return (
    <div className={cvaVariants({ columns, className })} {...props} />
  );
}
