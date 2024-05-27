import { createColumnHelper } from '@tanstack/react-table'
import ButtonActions from "./AdminProductsActions";
import { t } from "~/i18n/translate";
import { Product } from "~/types/global.type";
import AdminTable from "../table/AdminTable";

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
        header: () => <span>{t('TABLE.IMAGE')}</span>,
        cell: (props) => <img src={props.row.original.images?.[0].url} className="admin-banner-preview rounded-md" />
    }),
    columnHelper.accessor('title', {
        id: 'title',
        header: () => <span>{t('PRODUCT.PRODUCT')}</span>,
        cell: props => props.getValue()
    }),
    columnHelper.display({
        id: 'actions',
        header: () => <span>{t('TABLE.ACTIONS')}</span>,
        cell: (props) => <ButtonActions {...props} />,
    }),
];
export default function AdminProductsTable({ data = [] }: { data: Product[] }) {
    return <AdminTable columns={columns} data={data} columnStyles={styles} />
}
