import { useLoaderData } from "@remix-run/react";

import { Category } from "~/types/category";

import { Select, SelectProps } from "~/components/ui/form/Select";


export function CategorySelect(props: SelectProps) {
  const { categories } = useLoaderData<{ categories: Category[] }>() as { categories: Category[] };

  if (!categories) {
    console.error("categories cannot be empty");
  }

  return (
    <Select {...props}>
      <option value="">...</option>
      {categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}
    </Select>
  )
}
