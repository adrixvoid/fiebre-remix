import cx from "clsx";
import { atom, useAtom } from 'jotai';
import { Fragment } from "react";

import { Category } from "~/types/category";

import Button from "~/components/ui/button/Button";
import { CategoriesCheckbox } from "./checkbox/CheckboxCategory";

const modalCategory = atom(false);

const AdminDialogDataList = ({ categories }: { categories: Category[] }) => {
  const [isModalCategoryOpen, setModalCategoryOpen] = useAtom(modalCategory)

  function handleModalCategory(event: React.MouseEvent | React.KeyboardEvent) {
    event.preventDefault();
    setModalCategoryOpen(!isModalCategoryOpen)
  }

  function generateCategoriesCheckbox(categories: Category[], isSubcategory: boolean = false): JSX.Element[] {
    return categories.map(category => (
      <div key={`chkbox-${category._id}`} className={cx({ "checkbox-subitems": isSubcategory, "checkbox-items": !isSubcategory })}>
        <div className={cx({ "ml-3": isSubcategory })}>
          <CategoriesCheckbox
            name='category[]'
            value={category.path}
            label={category.path.split('/').join(' / ')}
          />
          {category.subcategories.length > 0 && generateCategoriesCheckbox(category.subcategories, true)}
        </div>
      </div>
    ))
  }

  const generateDataListOption = (categories: Category[], parent?: Category) => (
    categories.map(category => (
      <Fragment key={category._id}>
        {parent ? <option value={category.path.split('/').join(' / ')} /> : <option value={category.name} />}
        {category?.subcategories?.length > 0 && generateDataListOption(category.subcategories, category)}
      </Fragment >
    )
    ));

  return <>
    <Button type="button" onClick={handleModalCategory}>Add Category</Button>
    <div id="dialog_layer" className="dialogs">
      <dialog open={isModalCategoryOpen}>
        <h2 id="dialog1_label" className="dialog_label">Categories</h2>

        <fieldset>
          <label htmlFor="categories">
            Categories
          </label>
          <input list="categories" name="categories" placeholder="illustration, blog, noticias" className="mb-1" />
        </fieldset>
        {/* <datalist id="categories">
                    {generateDataListOption(categories)}
                </datalist> */}


        <div className="categories">
          {generateCategoriesCheckbox(categories)}
        </div>

        {/* <div>
                    <Button type="button" onClick={handleModalCategory}>Add another category</Button>
                </div> */}

        <div className="footer">
          <Button type="button" onClick={handleModalCategory}>Close</Button>
        </div>
      </dialog>
    </div>
  </>
}

export default AdminDialogDataList;



// const DialogDataList = ({ categories }: { categories: Category[] }) => {
//   const [isModalCategoryOpen, setModalCategoryOpen] = useAtom(modalCategory)

//   function handleModalCategory(event: React.MouseEvent | React.KeyboardEvent) {
//       event.preventDefault();
//       setModalCategoryOpen(!isModalCategoryOpen)
//   }

//   function generateCategoriesCheckbox(categories: Category[], isSubcategory: boolean = false): JSX.Element[] {
//       return categories.map(category => (
//           <div key={`chkbox-${category._id}`} className={cx({ "checkbox-subitems": isSubcategory, "checkbox-items": !isSubcategory })}>
//               <div className={cx({ "ml-3": isSubcategory })}>
//                   <CategoriesCheckbox
//                       name='category[]'
//                       value={category.path}
//                       label={category.path.split('/').join(' / ')}
//                   />
//                   {category.subcategories.length > 0 && generateCategoriesCheckbox(category.subcategories, true)}
//               </div>
//           </div>
//       ))
//   }

//   const generateDataListOption = (categories: Category[], parent?: Category) => (
//       categories.map(category => (
//           <Fragment key={category._id}>
//               {parent ? <option value={category.path.split('/').join(' / ')} /> : <option value={category.name} />}
//               {category?.subcategories?.length > 0 && generateDataListOption(category.subcategories, category)}
//           </Fragment >
//       )
//       ));

//   return <>
//       <Button type="button" onClick={handleModalCategory}>Add Category</Button>
//       <div id="dialog_layer" className="dialogs">
//           <dialog open={isModalCategoryOpen}>
//               <h2 id="dialog1_label" className="dialog_label">Categories</h2>

//               <label htmlFor="categories">
//                   Categories
//               </label>
//               <input list="categories" name="categories" placeholder="illustration, blog, noticias" className="mb-1" />
//               {/* <datalist id="categories">
//                   {generateDataListOption(categories)}
//               </datalist> */}


//               <div className="categories">
//                   {generateCategoriesCheckbox(categories)}
//               </div>

//               {/* <div>
//                   <Button type="button" onClick={handleModalCategory}>Add another category</Button>
//               </div> */}

//               <div className="footer">
//                   <Button type="button" onClick={handleModalCategory}>Close</Button>
//               </div>
//           </dialog>
//       </div>
//   </>
// }