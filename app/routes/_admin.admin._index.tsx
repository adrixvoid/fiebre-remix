import type { LoaderFunctionArgs } from "@remix-run/node"

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // const categoryParam = new URL(request.url).searchParams.get('category');
  console.log('params', params);

  return null;
}

export default function Admin() {

  return (
    <section className="markdown">
      <div className="container">
        <div className="markdown-list">
          Dashboard 2
        </div>
      </div>
    </section>
  );
}
