import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import styles from './Text.module.css';

const cvaVariants = cva(
  styles.base, {
  variants: {
    variant: {
      default: styles.default,
      primary: styles.primary,
      secondary: styles.secondary
    },
    size: {
      xl: styles.xl,
      lg: styles.lg,
      md: styles.md,
      sm: styles.sm
    },
    align: {
      left: styles.left,
      center: styles.center,
      right: styles.right
    },
    fontStyle: {
      italic: styles.italic
    }
  },
  compoundVariants: [
    { variant: "primary", size: "lg", className: styles['primary-large'] },
    { variant: "primary", size: "md", className: styles['primary-medium'] },
    { variant: "primary", size: "sm", className: styles['primary-small'] },
  ],
  defaultVariants: {
    variant: "default"
  },
})

export type TitleProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof cvaVariants> & {
    element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    asChild?: boolean
    weight?: number
  }

export function Title({ asChild, variant, size, element = "h1", align, fontStyle, className, ...props }: TitleProps) {
  const Comp = asChild ? Slot : element
  return (
    <Comp className={cvaVariants({ variant, size, align, fontStyle, className })} {...props} />
  )
}

type TextType = React.HTMLAttributes<HTMLParagraphElement> | React.HTMLAttributes<HTMLSpanElement>

export type TextProps = TextType &
  VariantProps<typeof cvaVariants> & {
    element?: "p" | "span";
    asChild?: boolean
  }

export function Text({ asChild, variant, size, element = "p", align, fontStyle, className, ...props }: TextProps) {
  const Comp = asChild ? Slot : element
  return (
    <Comp className={cvaVariants({ variant, size, align, fontStyle, className })} {...props} />
  )
}
