import { cva, type VariantProps } from 'class-variance-authority';

import styles from './Text.module.css';

const textVariants = cva(
  styles.text, {
  variants: {
    variant: {
      default: styles.textDefault,
      muted: styles.muted
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
  defaultVariants: {
    variant: "default"
  },
})

const titleVariants = cva(
  styles.title, {
  variants: {
    variant: {
      default: styles.titleDefault,
      primary: styles.titlePrimary
    },
    size: {
      xl: styles.titleXLarge,
      lg: styles.titleLarge,
      md: styles.titleMedium,
      sm: styles.titleSmall
    },
    align: {
      left: styles.left,
      center: styles.center,
      right: styles.right
    },
    fontStyle: {
      italic: styles.italic
    },
    baseline: {
      adjust: styles.adjustBaseline
    }
  },
  compoundVariants: [
    { variant: "primary", size: "lg", className: styles.titlePrimaryLarge },
    { variant: "primary", size: "md", className: styles.titlePrimaryMedium },
    { variant: "primary", size: "sm", className: styles.titlePrimarySmall },
  ],
  defaultVariants: {
    variant: "default"
  },
})

type TextType = React.HTMLAttributes<HTMLParagraphElement> | React.HTMLAttributes<HTMLSpanElement>

export type TextProps = TextType &
  VariantProps<typeof textVariants> & {
    as?: "p" | "span"
  }

export function Text({ as = "p", variant, size, align, fontStyle, className, ...props }: TextProps) {
  const Comp = as
  return (
    <Comp className={textVariants({ variant, size, align, fontStyle, className })} {...props} />
  )
}

export type TitleProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof titleVariants> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  }

export function Title({ as = "h1", variant, size, align, fontStyle, baseline, className, ...props }: TitleProps) {
  const Comp = as
  return (
    <Comp className={titleVariants({ variant, size, align, fontStyle, baseline, className })} {...props} />
  )
}
