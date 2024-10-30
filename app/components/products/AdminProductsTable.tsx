import { Link, useLocation, useNavigation, useParams, useSubmit } from "@remix-run/react";
import { createColumnHelper } from '@tanstack/react-table';
import { Trash2 } from "lucide-react";

import { ROUTE_PATH_ADMIN } from "~/constants";
import { t } from "~/i18n/translate";
import { Product } from "~/types/global.type";

import { Button } from "~/components/ui/button/Button";
import AdminTable from "~/components/ui/table/AdminTable";
import { TableCellAction, TableHeadAction } from "~/components/ui/table/Table";
import { formatCurrency } from "~/lib/price";

const styles = {
    images: {
        maxWidth: '100%',
        width: '50px'
    }
}
const columnHelper = createColumnHelper<Product>()
const columns = [
    columnHelper.accessor('images', {
        id: 'images',
        header: () => <span>{t('IMAGE')}</span>,
        cell: (props) => <img src={props.row.original.images?.[0]?.url} className="admin-banner-preview rounded-md" />
    }),
    columnHelper.accessor('title', {
        id: 'title',
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
            const name = props.row.original.title as string;

            const editPath = `${ROUTE_PATH_ADMIN.PRODUCT_FORM}/${id}?referrer=${location.pathname}`;
            const deletePath = `${ROUTE_PATH_ADMIN.PRODUCT_LIST}/${id}?referrer=${location.pathname}`;

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
                    <Button asChild variant="outline">
                        <Link to={editPath} state={location.state}>{t('EDIT')}</Link>
                    </Button>
                    <Button onClick={handleOnDelete} aria-label="delete" disabled={isDisabled} variant="destructive" color="danger">
                        <Trash2 />
                        <span className="sr-only">{t('DELETE')}</span>
                    </Button>
                </TableCellAction>
            )
        },
    }),
];

export default function AdminProductsTable({ data = [] }: { data: Product[] }) {
    return <AdminTable columns={columns} data={data} columnStyles={styles} caption="List of products" />
}
