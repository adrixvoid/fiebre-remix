import clsx from "clsx";

import { MapImage } from "~/types/global.type";

import styles from './PreviewList.module.css';

type PreviewListProps = React.HTMLAttributes<HTMLUListElement> & { images?: MapImage[] }
export function PreviewList({ images, className, ...props }: PreviewListProps) {
  return <ul className={clsx(styles.list, className)} {...props} />;
}

type PreviewListItemProps = React.LiHTMLAttributes<HTMLLIElement> & { disabled?: boolean; };
export function PreviewListItem({ disabled, className, ...props }: PreviewListItemProps) {
  return <li className={clsx(styles.item, { [styles.disabled]: disabled }, className)} {...props} />
}

type PreviewListImageProps = React.ImgHTMLAttributes<HTMLImageElement> & { disabled?: boolean; }
export function PreviewListImage({ disabled, className, ...props }: PreviewListImageProps) {
  return <img className={clsx(styles.image, { [styles.disabled]: disabled }, className)} {...props} />;
}

type PreviewListBadgeProps = React.HTMLAttributes<HTMLSpanElement> & { disabled?: boolean; };
export function PreviewListBadge({ disabled, className, ...props }: PreviewListBadgeProps) {
  return <span className={clsx(styles.badge, { [styles['badge-disabled']]: disabled }, className)} {...props} />;
}

type PreviewListActionsProps = React.HTMLAttributes<HTMLSpanElement> & { disabled?: boolean; };
export function PreviewListActions({ disabled, className, ...props }: PreviewListActionsProps) {
  return <span className={clsx(styles.actions, className)} {...props} />;
}

export default {
  List: PreviewList,
  Item: PreviewListItem,
  Image: PreviewListImage,
  Badge: PreviewListBadge,
  Actions: PreviewListActions
}
