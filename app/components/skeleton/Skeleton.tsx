import { cva, type VariantProps } from "class-variance-authority"
import styles from './Skeleton.module.css'

const cvaVariants = cva(
  styles.skeleton, {
  variants: {
    variant: {
      radius: styles.radius
    }
  }
})

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cvaVariants> {
  width?: string | number; height?: string | number; style?: React.CSSProperties
}

export const Skeleton = ({ variant, width = "100%", height = "10dvh", style, ...props }: SkeletonProps) => (
  <div className={cvaVariants({ variant })} style={{ width, height, ...style }} {...props} />
)
