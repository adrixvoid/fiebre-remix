import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "F I E B R E" },
    { name: "Fiebre", content: "Fiebre Design Studio - Buenos Aires Argentina" },
  ];
};

export const loader: LoaderFunction = ({ params }) => {
  const lang = params.lang as string;
  console.log("lang", lang)
  return {};
}

export default function Index() {
  return (
    <div>Hola</div>
  );
}
