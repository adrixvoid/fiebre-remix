import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { ROUTE_PATH } from "~/constants";

import markdownService from "~/server/services/markdown.service";

import Button from "~/components/button/Button";
import { Center } from "~/components/center/Center";
import { Container } from "~/components/container/Container";
import { Section } from "~/components/section/Section";
import { MarkdownPage } from "~/modules/markdown/Markdown";

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const content = await markdownService.readOne(url.pathname);

    if (!content) {
        return json({ message: 'Not found' }, { status: 404 });
    }

    return json({ content }, { status: 200 })
}

export default function PortfolioDetailPage() {
    return (
        <Section id="portfolio" marginBottom>
            <MarkdownPage key="portfolio" />
            <Container key="portfolio">
                <Center style={{ marginTop: "2rem", marginBottom: "2rem", gap: "1rem" }}>
                    <Button to={`${ROUTE_PATH.PORTFOLIO}`}>
                        Ver más
                    </Button>
                    <Button>
                        Quiero presupuesto
                    </Button>
                </Center>
            </Container>
        </Section>
    )
}
