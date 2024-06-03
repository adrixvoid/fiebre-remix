import { Link as RemixLink, NavLink as RemixNavLink } from "@remix-run/react";
import { RemixLinkProps, RemixNavLinkProps } from "@remix-run/react/dist/components";
import { cx } from "class-variance-authority";

export function Link(props: RemixLinkProps) {
  return <RemixLink {...props} className={cx("underline-offset-4 hover:underline", props.className)} />
}

export function NavLink(props: RemixNavLinkProps) {
  return (
    <RemixNavLink {...props} className={({ isActive, isPending }) => cx(
      "underline-offset-4 hover:underline", {
      "pending": isPending, "text-primary": isActive
    }, props.className)
    } />
  )
}
