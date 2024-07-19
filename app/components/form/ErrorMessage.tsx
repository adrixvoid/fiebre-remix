import styles from './ErrorMessage.module.css';

export const ErrorMessage = (({ error, name }: { error?: string; name?: string; }) => {
  return (
    <>
      {Boolean(error) && <label htmlFor={name} className={styles.error}>{error}</label>}
    </>
  )
})
