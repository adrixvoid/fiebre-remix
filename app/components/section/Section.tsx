import clsx from "clsx";

import styles from './Section.module.css';

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  marginBottom?: boolean;
}

export function Section({ className, marginBottom, ...props }: SectionProps) {
  return (
    <div className={clsx(className, {
      [styles['margin-bottom']]: marginBottom
    })} {...props} />
  );
}
