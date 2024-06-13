import * as React from "react"

import styles from "./Card.module.css";
import clsx from "clsx";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      styles.card,
      className
    )}
    {...props}
  />
))
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

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={clsx(styles.title, className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={clsx(styles.description, className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx(styles.content, className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img ref={ref} className={clsx(styles.image, className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardImageCover = React.forwardRef<
  HTMLImageElement,
  React.HTMLAttributes<HTMLDivElement> & {
    src?: string;
    alt?: string;
  }
>(({ className, src, alt, style, ...props }, ref) => (
  <div ref={ref} className={clsx(styles['image-cover'], className)} style={{ backgroundImage: `url(${src})`, ...style }} {...props}>
    <span className="sr-only">{alt}</span>
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

export { Card, CardHeader, CardFooter, CardImage, CardImageCover, CardTitle, CardDescription, CardContent, CardPadding }
