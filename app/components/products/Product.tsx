import styles from './Product.module.css'

export function ProductList({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.list}>
      {children}
    </div>
  );
}