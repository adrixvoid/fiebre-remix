import AdminCategoryForm from "~/components/categories/AdminCategoryForm";
import { actionAdminCategoriesCreateUpdate, loaderAdminCategoriesCreate } from "~/server/controllers/categories.controller";

export const loader = loaderAdminCategoriesCreate

export const action = actionAdminCategoriesCreateUpdate;

export default AdminCategoryForm;
