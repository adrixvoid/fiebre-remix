import { loaderAdminCategoriesCreate, actionAdminCategoriesCreateUpdate } from "~/server/controllers/categories.controller";
import AdminCategoryForm from "~/components/categories/AdminCategoryForm";

export const loader = loaderAdminCategoriesCreate

export const action = actionAdminCategoriesCreateUpdate;

export default AdminCategoryForm;
