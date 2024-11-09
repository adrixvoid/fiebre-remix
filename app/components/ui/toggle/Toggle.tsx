import { useState } from 'react';
import { ButtonBase, ButtonBaseProps } from '../button/ButtonBase';
import styles from './Toggle.module.css';

type ToggleProps = ButtonBaseProps & {
  label?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Toggle({ label, defaultChecked = false, onChange, ...props }: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={styles.toggleWrapper}>
      <ButtonBase
        type="button"
        role="switch"
        aria-checked={checked}
        data-state={checked ? 'checked' : 'unchecked'}
        className={styles.toggle}
        onClick={handleToggle}
        {...props}
      >
        <span className={styles.thumb} />
      </ButtonBase>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}