import { clsx } from 'clsx';
import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Chip } from '~/components/ui/chip/Chip';
import styles from './ChipInput.module.css';

export interface Option {
  value: string;
  label: string;
}

interface ChipInputProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function ChipInput({
  options,
  value,
  onChange,
  placeholder = 'Select options...',
  className,
}: ChipInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const handleRemoveChip = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  const selectedOptions = options.filter((option) => value.includes(option.value));

  return (
    <div className={clsx(styles.container, className)} ref={containerRef}>
      <div
        className={styles.input}
        onClick={() => setIsOpen(true)}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={0}
      >
        <div className={styles.chipContainer}>
          {selectedOptions.map((option) => (
            <Chip
              key={option.value}
              onDismiss={() => handleRemoveChip(option.value)}
              color="primary"
              variant="outlined"
            >
              {option.label}
            </Chip>
          ))}
        </div>
        {selectedOptions.length === 0 && (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
      </div>

      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          {options.map((option) => {
            const isSelected = value.includes(option.value);
            return (
              <div
                key={option.value}
                className={clsx(styles.option, isSelected && styles.selected)}
                onClick={() => handleOptionClick(option.value)}
                role="option"
                aria-selected={isSelected}
              >
                <div className={styles.checkbox}>
                  {isSelected && <Check size={12} color="white" />}
                </div>
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}