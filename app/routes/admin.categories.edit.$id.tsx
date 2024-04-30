import { ActionFunctionArgs, LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import { actionCreateOrUpdate, loaderEdit } from "~/server/controllers/categories.controller";
import AdminCategoryForm from "~/components/categories/AdminCategoryForm";
import styles from "~/styles/admin-content.css";

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: styles,
    },
];

export async function loader(args: LoaderFunctionArgs) {
    return await loaderEdit(args)
}

export async function action(args: ActionFunctionArgs) {
    return await actionCreateOrUpdate(args)
}

export default AdminCategoryForm;
