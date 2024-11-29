
import clsx from "clsx";
import { CSSProperties } from "react";
import styles from './MasonryGrid.module.css';

export type MasonryGridProps = React.HTMLAttributes<HTMLDivElement> & { columns?: number };

export interface CustomCSS extends CSSProperties {
  '--columns': number;
}

export function MasonryGrid({ className, columns, style, ...props }: MasonryGridProps) {
  return <div className={clsx(styles.masonry, className)} style={{
    ...style,
    "--columns": columns
  } as CustomCSS} {...props} />;
}
