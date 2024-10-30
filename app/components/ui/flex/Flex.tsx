import { cva, type VariantProps } from "class-variance-authority";

import styles from './Flex.module.css';

const flexVariants = cva(
  styles.flex, {
  variants: {
    justify: {
      start: styles['justify-start'],
      end: styles['justify-end'],
      center: styles['justify-center'],
      between: styles['justify-between'],
      around: styles['justify-around'],
    },
    align: {
      start: styles['align-start'],
      end: styles['align-end'],
      center: styles['align-center'],
    },
    direction: {
      row: styles.row,
      column: styles.column,
    },
    mobile: {
      'direction-row': styles['mobile-row'],
      'direction-column': styles['mobile-column']
    }
  },
  defaultVariants: {
    justify: "start",
    direction: "row",
  },
})

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof flexVariants> {
  gap?: string;
}

export function Flex({ className, justify, align, direction, mobile, gap, style, ...props }: FlexProps) {
  return (
    <div className={flexVariants({ justify, align, direction, mobile, className })} {...props} style={{
      ...style,
      gap
    }} />
  );
}