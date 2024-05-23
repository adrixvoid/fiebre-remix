import { actionAdminCategoriesCreateUpdate, loaderAdminCategoriesEdit } from "~/server/controllers/categories.controller";
import AdminCategoryForm from "~/components/categories/AdminCategoryForm";

export const loader = loaderAdminCategoriesEdit

export const action = actionAdminCategoriesCreateUpdate

export default AdminCategoryForm;
