import { useLoaderData } from "@remix-run/react";
import { Category } from "~/types/global.type";
import { Select, SelectProps } from "../form/Select";

export function CategorySelect(props: SelectProps) {
  const { categories } = useLoaderData<{ categories: Category[] }>() as { categories: Category[] };

  if (!categories) {
    console.error("categories cannot be empty");
  }

  // console.log("categories", categories)

  return (
    <Select {...props}>
      {categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}
    </Select>
  )
}
