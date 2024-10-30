import { cva, type VariantProps } from "class-variance-authority";

import styles from './Viewport.module.css';

const viewportVariants = cva(
  styles.base, {
  variants: {
    variant: {
      mobile: styles.mobile,
      desktop: styles.desktop,
      ["mobile-hidden"]: styles['mobile-hidden'],
      ["desktop-hidden"]: styles['desktop-hidden'],
    }
  },
})

export interface ViewportProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof viewportVariants> { }

export function Viewport({ variant, className, ...props }: ViewportProps) {
  return (
    <div className={viewportVariants({ variant, className })} {...props} />
  );
}