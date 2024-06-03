import { ReactNode } from "react";
import { cn } from "~/lib/utils";

export function Nav({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <nav className={cn(className, "text-sm flex items-center align-center gap-3")}>
      {children}
    </nav>
  )
}
