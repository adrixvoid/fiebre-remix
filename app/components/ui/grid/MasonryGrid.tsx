
import clsx from "clsx";
import styles from './MasonryGrid.module.css';

export type MasonryGridProps = React.HTMLAttributes<HTMLDivElement>;

export function MasonryGrid({ className, ...props }: MasonryGridProps) {
  return <div className={clsx(styles.masonry, className)} {...props} />;
}
