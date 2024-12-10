import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import CategoryDraggableList, { Category } from '~/components/CategoryDraggableList';

export const loader = async () => {
  // Fetch categories from your database here
  const categories: Category[] = [
    { id: '1', name: 'Category 1', parentId: null },
    {
      id: '2', name: 'Category 2', parentId: null, subcategories: [
        { id: '2-1', name: 'Subcategory 2-1', parentId: '2' },
        { id: '2-2', name: 'Subcategory 2-2', parentId: '2' },
      ]
    },
    { id: '3', name: 'Category 3', parentId: null },
  ];

  return json({ categories });
};

export default function CategoriesPage() {
  const { categories: initialCategories } = useLoaderData<typeof loader>();
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const handleUpdateCategories = (category: Category, updatedCategories: Category[]) => {
    setCategories(updatedCategories);
    // Here you would typically send the updated categories to your backend
    console.log('Category updated:', category);
    console.log('Categories updated:', updatedCategories);
  };

  return (
    <div style={{ padding: "2em", backgroundColor: "hsl(var(--background))" }}>
      <h1>Categories</h1>
      <CategoryDraggableList categories={categories} onUpdateCategories={handleUpdateCategories} renderItem={(item) => <a href="#">{item.name}</a>} />
    </div>
  );
}

