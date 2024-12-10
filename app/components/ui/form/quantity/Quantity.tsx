import { Minus, Plus } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import styles from './Quantity.module.css';

type QuantityProps = React.InputHTMLAttributes<HTMLInputElement> & {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export function Quantity({ initialValue = 1, min = 1, max = 999, onChange, ...props }: QuantityProps) {
  const [quantity, setQuantity] = useState(initialValue);

  const increment = () => {
    const newValue = Math.min(quantity + 1, max);
    setQuantity(newValue);
    onChange?.(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(quantity - 1, min);
    setQuantity(newValue);
    onChange?.(newValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      const numValue = value === '' ? min : Math.max(Math.min(parseInt(value, 10), max), min);
      setQuantity(numValue);
      onChange?.(numValue);
    }
  };

  return (
    <div className={styles.quantityContainer}>
      <button className={styles.quantityButton} onClick={decrement} disabled={quantity <= min}>
        <Minus size={16} />
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={quantity}
        onChange={handleInputChange}
        className={styles.quantityInput}
        aria-label="Quantity"
        {...props}
      />
      <button className={styles.quantityButton} onClick={increment} disabled={quantity >= max}>
        <Plus size={16} />
      </button>
    </div>
  );
}

