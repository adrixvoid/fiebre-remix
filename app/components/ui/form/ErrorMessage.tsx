import styles from './ErrorMessage.module.css';

export type InputErrorMessage = string | null;

export const ErrorMessage = (({ error, name }: { error?: InputErrorMessage; name?: string; }) => {
  return (
    <>
      {Boolean(error) && <label htmlFor={name} className={styles.error}>{error}</label>}
    </>
  )
})
