import { useSubmit, useNavigation, useParams, Link, useLocation } from "@remix-run/react";
import { createColumnHelper } from '@tanstack/react-table'

import { t } from "~/i18n/translate";
import { Product } from "~/types/global.type";
import { ADMIN_ROUTE_PATH } from "~/constants";

import AdminTable from "~/components/table/AdminTable";
import { Button } from "~/components/ui/button";
import { Trash2 } from "lucide-react"

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
        header: () => <span>{t('GLOBAL.IMAGE')}</span>,
        cell: (props) => <img src={props.row.original.images?.[0]?.url} className="admin-banner-preview rounded-md" />
    }),
    columnHelper.accessor('title', {
        id: 'title',
        header: () => <span>{t('PRODUCT.PRODUCT')}</span>,
        cell: props => props.getValue()
    }),
    columnHelper.display({
        id: 'actions',
        header: () => <span>{t('GLOBAL.ACTIONS')}</span>,
        cell: (props) => {
            const location = useLocation();

            const slug = props.row.original.slug as string;
            const id = props.row.original._id?.toString() || "";
            const name = props.row.original.title as string;

            const editPath = `${ADMIN_ROUTE_PATH.PRODUCT_FORM}/${id}?referrer=${location.pathname}`;
            const deletePath = `${ADMIN_ROUTE_PATH.PRODUCT_LIST}/${id}?referrer=${location.pathname}`;

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
                <div className="actions">
                    <Button asChild variant="outline">
                        <Link to={editPath} state={location.state}>{t('GLOBAL.EDIT')}</Link>
                    </Button>
                    <Button onClick={handleOnDelete} aria-label="delete" size='icon' disabled={isDisabled} variant="destructive" color="danger">
                        <Trash2 className="h-5 w-5" />
                        <span className="sr-only">{t('GLOBAL.DELETE')}</span>
                    </Button>
                </div>
            )
        },
    }),
];

export default function AdminProductsTable({ data = [] }: { data: Product[] }) {
    return <AdminTable columns={columns} data={data} columnStyles={styles} caption="List of products" />
}
