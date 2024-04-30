
/* border-radius: 4px; */
// style={{ border: "1px solid white", borderRadius: 4 }}
import styles from "./CheckboxCategory.module.css";

interface CategoriesCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: React.ReactNode
}

export const CategoriesCheckbox = ({ name, value, label }: CategoriesCheckboxProps) => (
    <label className={styles.label} htmlFor={String(value)}>
        <input id={String(value)} type="checkbox" name={name} value={value} />{label}
    </label>
)