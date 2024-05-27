import { useSubmit, useNavigation, useParams } from "@remix-run/react";
import { CellContext } from '@tanstack/react-table'

import { Product } from '~/types/global.type';
import { ADMIN_ROUTE_PATH } from "~/constants";
import Button, { IconButton } from "~/components/button/Button";
import IconTrash from '~/components/svg/IconTrash'

const ButtonActions = (props: CellContext<Product, unknown>) => {
    const slug = props.row.original.slug as string;
    const id = props.row.original._id?.toString() || "";
    const name = props.row.original.title as string;

    const editPath = `${ADMIN_ROUTE_PATH.CATEGORY_EDIT}/${id}`;
    const deletePath = `${ADMIN_ROUTE_PATH.CATEGORY_DELETE}/${id}`;

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
            <Button to={editPath} size='sm'>Editar</Button>
            <IconButton onClick={handleOnDelete} aria-label="delete" size='sm' disabled={isDisabled} variant="outline" color="danger" icon={<IconTrash />}>
                <span className="sr-only">Eliminar</span>
            </IconButton>
        </div>
    )
}

export default ButtonActions;