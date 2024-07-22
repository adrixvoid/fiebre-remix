import { Link as RemixLink } from "@remix-run/react";
import { RemixLinkProps } from "@remix-run/react/dist/components";
import { cx } from "class-variance-authority";

import styles from './Link.module.css';

export type LinkProps = RemixLinkProps;

export function Link({ className, ...props }: LinkProps) {
  return <RemixLink {...props} className={cx(styles.link, className)} />
}
