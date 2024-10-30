import { Outlet } from "@remix-run/react";

import Footer from "~/components/footer";
import MainHeader from "~/components/MainHeader";

// export const loader: LoaderFunction = ({ params }) => {
//   const lang = params.lang as string;
//   return {};
// }

export default function PublicLayout() {
  return (
    <div className="layout">
      <MainHeader />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
