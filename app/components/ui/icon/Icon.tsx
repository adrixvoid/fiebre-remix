import { SVGProps } from "react";
import { iconPaths } from "./IconPaths";

import clsx from "clsx";
import styles from './icon.module.css';

interface IconProps extends SVGProps<SVGSVGElement> {
  icon: keyof typeof iconPaths;
  color?: string;
  gradient?: boolean;
  size?: string;
}

function Icon({ className, color = "currentcolor", gradient, icon, size = "1em", style, ...props }: IconProps) {
  const iconPath = iconPaths[icon];

  const gradientId =
    "icon-gradient-" + Math.round(Math.random() * 10e12).toString(36);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 256 256"
      aria-hidden="true"
      stroke={gradient ? `url(#${gradientId})` : color}
      fill={gradient ? `url(#${gradientId})` : color}
      className={clsx(styles.svg, className)}
      style={{ "--size": size, ...style } as React.CSSProperties}
    >
      <g dangerouslySetInnerHTML={{ __html: iconPath }} />
      {
        gradient && (
          <linearGradient
            id={gradientId}
            x1="23"
            x2="235"
            y1="43"
            y2="202"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="var(--gradient-stop-1)" />
            <stop offset=".5" stop-color="var(--gradient-stop-2)" />
            <stop offset="1" stop-color="var(--gradient-stop-3)" />
          </linearGradient>
        )
      }
    </svg>
  )
}

export default Icon;