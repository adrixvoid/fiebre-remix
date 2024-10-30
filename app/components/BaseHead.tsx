import {
  Links,
  Meta
} from "@remix-run/react";

export const BaseHead = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" media="all" />
      <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,200;0,300;0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
    </>
  )
}