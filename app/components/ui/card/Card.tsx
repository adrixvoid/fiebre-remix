import * as React from "react";

import clsx from "clsx";
import { Text, TextProps, Title, TitleProps } from "../text/Text";
import styles from "./Card.module.css";

type CardProp = React.HTMLAttributes<HTMLDivElement> & {
  as?: 'article' | 'div',
  shadow?: boolean;
  background?: boolean;
  border?: boolean;
}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProp
>(({ as = 'div', shadow, background, border, className, ...props }, ref) => {
  const Comp = as
  return (
    <Comp
      ref={ref}
      className={clsx(
        styles.card,
        className,
        {
          [styles.shadow]: shadow,
          [styles.background]: background,
          [styles.border]: border,
        }
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(styles.header, className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = ({ className, ...props }: TitleProps) => (
  <Title
    className={clsx(styles.title, className)}
    {...props}
  />
)

CardTitle.displayName = "CardTitle"

const CardDescription = (({ className, ...props }: TextProps) => (
  <Text
    className={clsx(styles.description, className)}
    {...props}
  />
))

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx(styles.content, className)} {...props} />
))
CardContent.displayName = "CardContent"

export type CardImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  asCover?: boolean;
};

const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(({ className, src, asCover, style, ...props }, ref) => {
  const inlineStyle = typeof style === "object" ? style : {};
  const styleExtended = { backgroundImage: `url(${src})`, ...inlineStyle };

  return (
    <>
      {
        asCover ? (
          <div
            className={clsx(styles["image-cover"], className)}
            style={styleExtended}
            aria-hidden="true"
          >
            <slot />
          </div>
        ) : (
          <img
            ref={ref}
            src={src}
            className={clsx(styles.image, className)}
            style={style}
            {...props}
            aria-hidden="true"
          />
        )
      }
    </>
  )
})

CardContent.displayName = "CardContent"

const CardImageCover = React.forwardRef<
  HTMLImageElement,
  React.HTMLAttributes<HTMLDivElement> & {
    src?: string;
    alt?: string;
  }
>(({ className, src, alt, style, children, ...props }, ref) => (
  <div ref={ref} className={clsx(styles['image-cover'], className)} style={{ backgroundImage: `url(${src})`, ...style }} {...props}>
    <span className="sr-only">{alt}</span>
    {children}
  </div>
))
CardImageCover.displayName = "CardImageCover"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(styles.footer, className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

const CardPadding = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx(styles.padding, className)} {...props} />
))
CardPadding.displayName = "CardPadding"

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImage, CardImageCover, CardPadding, CardTitle };

