import { PropsWithChildren } from 'react'

export const A11yText = ({ children, srOnly }: PropsWithChildren & { srOnly: string }) => (
  <>
    <span className="sr-only">{srOnly}</span>
    <span aria-hidden="true">{children}</span>
  </>
)
