import { GripVertical } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { Category } from '~/types/category';
import styles from './CategoryDraggableList.module.css';

// export interface Category {
//   id: string;
//   name: string;
//   parentId: string | null;
//   subcategories?: Category[];
// }

interface CategoryListProps<T> {
  categories: T[];
  onUpdateCategories: (item: T, categories: T[]) => void;
  renderItem?: (item: T) => React.ReactNode
}

const CategoryDraggableList: React.FC<CategoryListProps<Category>> = ({ categories, onUpdateCategories, renderItem }) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const onDragStart = (e: React.DragEvent<HTMLSpanElement | HTMLUListElement | HTMLLIElement>, id: string) => {
    setDraggingId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const onDragOver = (e: React.DragEvent<HTMLSpanElement | HTMLUListElement | HTMLLIElement | HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add(styles.over);
  };

  const onDragLeave = (e: React.DragEvent<HTMLSpanElement | HTMLUListElement | HTMLLIElement | HTMLDivElement>) => {
    e.currentTarget.classList.remove(styles.over);
  };

  const findCategory = (categories: Category[], id: string): Category | null => {
    for (const category of categories) {
      if (category.id === id) return category;
      if (category.subcategories) {
        const found = findCategory(category.subcategories, id);
        if (found) return found;
      }
    }
    return null;
  };

  const removeCategory = (categories: Category[], id: string): Category[] => {
    return categories.reduce((acc: Category[], category) => {
      if (category.id === id) return acc;
      const newCategory = { ...category };
      if (category.subcategories) {
        newCategory.subcategories = removeCategory(category.subcategories, id);
      }
      acc.push(newCategory);
      return acc;
    }, []);
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLSpanElement | HTMLUListElement | HTMLLIElement | HTMLDivElement>, targetId: string | null) => {
    e.preventDefault();
    e.currentTarget.classList.remove(styles.over);
    const sourceId = e.dataTransfer.getData('text/plain');

    if (sourceId === targetId) {
      return;
    }

    const updatedCategories = [...categories];
    const draggedCategory = findCategory(updatedCategories, sourceId);

    if (draggedCategory) {
      // Remove the category from its current position
      const categoriesWithoutDragged = removeCategory(updatedCategories, sourceId);

      if (targetId === null) {
        // Dropping to main level
        draggedCategory.parentId = null;
        categoriesWithoutDragged.push(draggedCategory);
      } else {
        // Dropping into another category
        const targetCategory = findCategory(categoriesWithoutDragged, targetId);
        if (targetCategory) {
          draggedCategory.parentId = targetId;
          if (!targetCategory.subcategories) {
            targetCategory.subcategories = [];
          }
          targetCategory.subcategories.push(draggedCategory);
        }
      }

      onUpdateCategories(draggedCategory, categoriesWithoutDragged);
    }

    setDraggingId(null);
  }, [onUpdateCategories]);

  const renderCategory = (category: Category) => (
    <li
      key={category.id}
      className={styles.categoryItem}
    >
      <div
        className={`${styles.categoryDropZone} ${draggingId === category.id ? styles.dragging : ''}`}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDragStart={(e) => onDragStart(e, category.id)}
        onDrop={(e) => {
          onDrop(e, category.id)
        }}
        draggable
        role='button'
      >
        <span
          className={styles.categoryMove}
        >
          <GripVertical />
        </span>
        {renderItem ? renderItem(category) : category.name}
      </div>
      {category.subcategories && category.subcategories.length > 0 && (
        <ul className={styles.nestedCategories}>
          {category.subcategories.map(renderCategory)}
        </ul>
      )}
    </li>
  );

  return (
    <>
      <div
        className={styles.mainDropZone}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e, null)}
      >
      </div>
      <ul className={styles.categoryList}>
        {categories.filter(category => category.parentId === null).map(renderCategory)}
      </ul>
      <div
        className={styles.mainDropZone}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e, null)}
      >
        Drop here
      </div>
    </>
  );
};

export default CategoryDraggableList;

