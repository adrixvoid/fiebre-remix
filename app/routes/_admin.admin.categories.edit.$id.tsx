import AdminCategoryForm from "~/components/categories/AdminCategoryForm";
import { actionAdminCategoriesCreateUpdate, loaderAdminCategoriesEdit } from "~/server/controllers/categories.controller";

export const loader = loaderAdminCategoriesEdit

export const action = actionAdminCategoriesCreateUpdate

export default AdminCategoryForm;
