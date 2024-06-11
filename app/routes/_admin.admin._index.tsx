import type { LoaderFunctionArgs } from "@remix-run/node"
import { Container } from "~/components/container/Container";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // const categoryParam = new URL(request.url).searchParams.get('category');
  console.log('params', params);

  return null;
}

export default function Admin() {

  return (
    <section className="markdown">
      <Container>
        <div className="markdown-list">
          Dashboard 2
        </div>
      </Container>
    </section>
  );
}
