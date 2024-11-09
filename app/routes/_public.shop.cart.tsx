import { useLoaderData, useLocation, useNavigation, useParams, useSubmit } from "@remix-run/react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import clsx from "clsx";

import Button from "~/components/ui/button/Button";
import { Container } from "~/components/ui/container/Container";
import { Flex } from "~/components/ui/flex/Flex";
import { Link } from "~/components/ui/link/Link";
import { Section } from "~/components/ui/section/Section";
import { Table, TableBody, TableCaption, TableCell, TableCellAction, TableHead, TableHeadAction, TableHeader, TableRow } from "~/components/ui/table/Table";
import { ROUTE_PATH } from "~/constants";
import { t } from "~/i18n/translate";
import { formatCurrency } from "~/lib/currency";
import { Product } from "~/types/product";

// import { getCart } from "~/server/shoppingCart.server"
// import type { Product } from "~/server/products.service"

const columnHelper = createColumnHelper<Product>()
const columns = [
    columnHelper.accessor('images', {
        id: 'images',
        header: () => <span>{t('IMAGE')}</span>,
        cell: (props) => <img src={props.row.original.images?.[0]?.url} style={{ maxWidth: 75 }} />
    }),
    columnHelper.accessor('name', {
        id: 'name',
        header: () => <span>{t('PRODUCT.PRODUCT')}</span>,
        cell: props => props.getValue()
    }),
    columnHelper.accessor('priceInCents', {
        id: 'price',
        header: () => <span>{t('PRODUCT.PRICE')}</span>,
        cell: props => formatCurrency(props.getValue())
    }),
    columnHelper.display({
        id: 'actions',
        header: () => <TableHeadAction>{t('ACTIONS')}</TableHeadAction>,
        cell: (props) => {
            const location = useLocation();

            const slug = props.row.original.slug as string;
            const id = props.row.original._id?.toString() || "";
            const name = props.row.original.name as string;

            const editPath = `${ROUTE_PATH.SHOPPING_PAYMENT}/${id}?referrer=${location.pathname}`;
            const deletePath = `${ROUTE_PATH.SHOPPING_PAYMENT}/${id}?referrer=${location.pathname}`;

            const params = useParams();
            const navigation = useNavigation();
            const submit = useSubmit();
            const isDisabled = params.slug === slug && navigation.state === "loading";

            const handleOnDelete = () => {
                if (confirm(`Confirma que desea eliminar el siguiente Item?\n${name}`)) {
                    const formData = new FormData();
                    formData.append("id", id);
                    submit(formData, { method: "post", action: deletePath, navigate: false });
                }
            }

            return (
                <TableCellAction>
                    <Link to={editPath}>Remove</Link>
                </TableCellAction>
            )
        },
    }),
];

export type ColumnMap = { [key: string]: object };

const getColumnClassName = (columnClassName?: ColumnMap, columnId?: string) => clsx(
    columnClassName && columnId && columnClassName[columnId], {
    'text-end': columnId === 'actions',
    'column-actions': columnId === 'actions',
});
const getColumnStyle = (columnStyles?: ColumnMap, columnId?: string) => (columnStyles && columnId) ? columnStyles[columnId] : {}

export const loader = async () => {
    const dataJSON: Product[] = [
        {
            "_id": "66810804670c15f1cc7449eb",
            "name": "The insta pink kit (plantillas insta)",
            "description": "Estas plantillas son ideales para vos si sos emprendedora y ofreces un\r\nservicio intangible ya que los diseños están pensados para que puedas\r\ncompartir información directamente desde tu conocimiento a través de\r\nfrases y textos, y en menor medida imágenes o fotos. \r\n\r\n\r\nSi ofreces productos, te recomiendo estas plantillas: Vaporwave\r\n\r\n\r\n\r\n\r\n\r\nQUÉ INCLUYE PINK KIT\r\n\r\n💖 15 posts de instagram editables en Canva\r\n💖 15 stories de instagram editables en Canva\r\n💖 Todos los recursos gráficos (fondos, imágenes, iconos)\r\n💖 Mini guía de diseño\r\n\r\n\r\nQUÉ VAS A PODER HACER CON ESTAS PLANTILLAS\r\n✨ Inspirar a tu audiencia con frases inspiracionales\r\n✨ Dar comunicados importantes sobre lo que ofreces\r\n✨ Resolver tus posts en dos minutos eligiendo la plantillas\r\n✨ Crear diseños nuevos conservando siempre la misma línea estética\r\n\r\n\r\nCÓMO SE USA\r\n\r\n👉 Una vez realizada la compra automáticamente vas a poder descargar\r\nun archivo PDF interactivo\r\n👉 Clickeá en los botones del PDF para ir a las plantillas editables\r\n👉 Divertite creando!\r\n\r\n\r\n\r\n\r\n\r\nSi tenés alguna pregunta no dudes en consultarme por instagram a @fiebrediseno\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nGracias! 🌴",
            "slug": "the-insta-pink-kit-(plantillas-insta)",
            "images": [
                {
                    "url": "/products/4c2091f5-4720-4bc7-8e86-8e330e0fb0d6-1.jpg",
                    "fileName": "4c2091f5-4720-4bc7-8e86-8e330e0fb0d6-1.jpg",
                    "filePath": "public/products/4c2091f5-4720-4bc7-8e86-8e330e0fb0d6-1.jpg",
                    "directory": "public/products"
                },
                {
                    "url": "/products/5024fe78-e828-48ba-9ff5-725fda39cc79-2.jpg",
                    "fileName": "5024fe78-e828-48ba-9ff5-725fda39cc79-2.jpg",
                    "filePath": "public/products/5024fe78-e828-48ba-9ff5-725fda39cc79-2.jpg",
                    "directory": "public/products"
                },
                {
                    "url": "/products/292d5f9f-b5aa-4c15-929e-1a4424bee6e3-3.jpg",
                    "fileName": "292d5f9f-b5aa-4c15-929e-1a4424bee6e3-3.jpg",
                    "filePath": "public/products/292d5f9f-b5aa-4c15-929e-1a4424bee6e3-3.jpg",
                    "directory": "public/products"
                },
                {
                    "url": "/products/646ea104-37bd-4840-bffb-d791373a0c00-4.jpg",
                    "fileName": "646ea104-37bd-4840-bffb-d791373a0c00-4.jpg",
                    "filePath": "public/products/646ea104-37bd-4840-bffb-d791373a0c00-4.jpg",
                    "directory": "public/products"
                },
                {
                    "url": "/products/f92e9e8c-f603-4513-8c42-331f884810b8-5.jpg",
                    "fileName": "f92e9e8c-f603-4513-8c42-331f884810b8-5.jpg",
                    "filePath": "public/products/f92e9e8c-f603-4513-8c42-331f884810b8-5.jpg",
                    "directory": "public/products"
                },
                {
                    "url": "/products/f680204a-45fb-4a35-ba7e-65187e8e5dd0-6.jpg",
                    "fileName": "f680204a-45fb-4a35-ba7e-65187e8e5dd0-6.jpg",
                    "filePath": "public/products/f680204a-45fb-4a35-ba7e-65187e8e5dd0-6.jpg",
                    "directory": "public/products"
                },
                {
                    "url": "/products/f8c36b70-e988-40be-a229-3179c4760e49-7.jpg",
                    "fileName": "f8c36b70-e988-40be-a229-3179c4760e49-7.jpg",
                    "filePath": "public/products/f8c36b70-e988-40be-a229-3179c4760e49-7.jpg",
                    "directory": "public/products"
                },
                {
                    "url": "/products/da97d165-de79-4961-85ce-fc9df447a7e6-8.jpg",
                    "fileName": "da97d165-de79-4961-85ce-fc9df447a7e6-8.jpg",
                    "filePath": "public/products/da97d165-de79-4961-85ce-fc9df447a7e6-8.jpg",
                    "directory": "public/products"
                }
            ],
            "price": 0,
            "priceInCents": 1500,
            "priceHidden": false,
            "productType": "stock",
            "downloadUrl": "https://docs.google.com/forms/d/e/1FAIpQLSdpWD0uKQKe4U9yUbbWSEFl7ee3FdxeGaoQuGmnIztCZDA2rw/viewform",
            "file": undefined,
            "categories": [],
            "tags": ["kit"],
            "active": true,
            "createdAt": new Date("2024-06-30T07:23:48.913Z"),
            "updatedAt": new Date("2024-10-31T00:20:17.902Z"),
            "stock": 0
        },
        {
            "_id": "668109d6670c15f1cc7449ef",
            "name": "Vaporwave instagram templates",
            "description": "If you want to call attention of your followers this trendy style is for you! There're a lot of resources of vaporwave aesthetic like the windows 95 UI or the dolphins and palm trees in combination with a nostalgic and vibrant color palette.\r\n\r\nThe most important thing is the social media strategy that you can create from promotion to engagement by editing the texts however you want. You can also use all the graphic resources and the design guide to create your own stylish designs!\r\n\r\n\r\n\r\nWHAT YOU'LL GET\r\n\r\n💖 Link to 20 posts editable on canva\r\n\r\n💖 Link to 20 stories editable on canva\r\n\r\n💖 Link to graphic elements and design manual (canva)\r\n\r\n💖 Backgrounds, images and icons in png format\r\n\r\n\r\n\r\n\r\nWHAT YOU CAN DO WITH THESE TEMPLATES\r\n\r\n✨ Promotion your brand\r\n\r\n✨ Interact with your followers\r\n\r\n✨ Engage your target audiences\r\n\r\n\r\n\r\n\r\nHOW TO USE IT\r\n\r\n👉 Download the PDF file\r\n\r\n👉 Click over the buttons to go to canva templates\r\n\r\n👉 Download png images in your cellphone to use it in your stories\r\n\r\n👉 Enjoy!\r\n\r\n\r\n\r\n\r\nIf you have any questions regarding my products, please do not hesitate to write me anytime on instagram @fiebrediseno\r\n\r\n",
            "slug": "vaporwave-instagram-templates",
            "images": [
                {
                    "url": "/products/74d29d51-3e9c-4381-b7c7-1739281a72a6-8.jpg",
                    "fileName": "74d29d51-3e9c-4381-b7c7-1739281a72a6-8.jpg",
                    "filePath": "public/products/74d29d51-3e9c-4381-b7c7-1739281a72a6-8.jpg",
                    "directory": "public/products"
                },
                {
                    "url": "/products/dd7cce50-26f3-4b6c-b19d-92e344c45322-7.jpg",
                    "fileName": "dd7cce50-26f3-4b6c-b19d-92e344c45322-7.jpg",
                    "filePath": "public/products/dd7cce50-26f3-4b6c-b19d-92e344c45322-7.jpg",
                    "directory": "public/products"
                },
                {
                    "url": "/products/85bbe144-6220-44ab-88f2-eca23a540ba2-6.jpg",
                    "fileName": "85bbe144-6220-44ab-88f2-eca23a540ba2-6.jpg",
                    "filePath": "public/products/85bbe144-6220-44ab-88f2-eca23a540ba2-6.jpg",
                    "directory": "public/products"
                },
                {
                    "url": "/products/373514f5-4521-49b6-a3aa-7bf6a9ace214-5.jpg",
                    "fileName": "373514f5-4521-49b6-a3aa-7bf6a9ace214-5.jpg",
                    "filePath": "public/products/373514f5-4521-49b6-a3aa-7bf6a9ace214-5.jpg",
                    "directory": "public/products"
                },
                {
                    "url": "/products/910fc2df-55b4-4ff7-91cb-82fed274cf71-4.jpg",
                    "fileName": "910fc2df-55b4-4ff7-91cb-82fed274cf71-4.jpg",
                    "filePath": "public/products/910fc2df-55b4-4ff7-91cb-82fed274cf71-4.jpg",
                    "directory": "public/products"
                },
                {
                    "url": "/products/2f902ef2-8e03-444a-9975-a7b3b3fe4cbb-3.jpg",
                    "fileName": "2f902ef2-8e03-444a-9975-a7b3b3fe4cbb-3.jpg",
                    "filePath": "public/products/2f902ef2-8e03-444a-9975-a7b3b3fe4cbb-3.jpg",
                    "directory": "public/products"
                },
                {
                    "url": "/products/0710508a-729c-4449-a5de-311f2d4e5c0c-2.jpg",
                    "fileName": "0710508a-729c-4449-a5de-311f2d4e5c0c-2.jpg",
                    "filePath": "public/products/0710508a-729c-4449-a5de-311f2d4e5c0c-2.jpg",
                    "directory": "public/products"
                },
                {
                    "url": "/products/0cf70c57-4c9d-460c-931e-ec35d75cf83d-1.jpg",
                    "fileName": "0cf70c57-4c9d-460c-931e-ec35d75cf83d-1.jpg",
                    "filePath": "public/products/0cf70c57-4c9d-460c-931e-ec35d75cf83d-1.jpg",
                    "directory": "public/products"
                }
            ],
            "price": 0,
            "priceInCents": 1500,
            "priceHidden": false,
            "productType": "downloadUrl",
            "downloadUrl": "https://docs.google.com/forms/d/e/1FAIpQLSdpWD0uKQKe4U9yUbbWSEFl7ee3FdxeGaoQuGmnIztCZDA2rw/viewform",
            "file": undefined,
            "categories": [],
            "tags": ["templates"],
            "active": true,
            "createdAt": new Date("2024-06-30T07:31:34.418Z"),
            "updatedAt": new Date("2024-06-30T07:31:34.418Z")
        }];

    // return getCart()
    return { products: dataJSON };
}

const Cart = () => {
    const caption = "Shopping Cart List"
    const { products } = useLoaderData<typeof loader>() as { products: Product[] };
    const table = useReactTable({
        columns,
        data: products,
        getCoreRowModel: getCoreRowModel(),
        defaultColumn: {
            size: 90, //starting column size
            minSize: 50, //enforced during column resizing
            maxSize: 200, //enforced during column resizing
        }
    })

    return (
        <Section id="shopping-cart" marginBottom>
            <Container>
                <div style={{ marginBottom: "2.5rem" }}>
                    <h1 style={{ marginBottom: 0 }}>Your Cart</h1>
                    <p style={{ marginTop: 0 }}>You have 2 items in your cart</p>
                </div>
                <div>
                    <Table>
                        {caption && <TableCaption>{caption}</TableCaption>}
                        <TableHeader>
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <TableHead key={header.id}
                                            className={getColumnClassName({}, header.column.id)}
                                            style={getColumnStyle({}, header.column.id)}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.map(row => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id} className={getColumnClassName({}, cell.column.id)}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Flex style={{ marginTop: "2.5rem" }}>
                    <Flex>
                        <div>
                            <div>Order Sub-Total</div>
                            <div>2 Items</div>
                        </div>
                        <div>
                            $150,00
                        </div>
                    </Flex>
                    <Button variant="primary">Checkout</Button>
                </Flex>
            </Container>
        </Section>
    )
}

export default Cart