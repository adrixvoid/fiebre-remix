import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ButtonProps } from '../button/Button';
import { ButtonBase } from '../button/ButtonBase';
import styles from './Dropdown.module.css';

interface DropdownProps {
  trigger: React.ReactNode;
  items: Array<{
    label: string;
    onClick: () => void;
  }>;
  variant?: ButtonProps['variant']
}

export function Dropdown({ trigger, items, variant }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const close = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
    triggerRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev < items.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Tab':
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev < items.length - 1 ? prev + 1 : -1
          );
          if (highlightedIndex === items.length - 1) {
            close();
          }
          break;
        case 'Escape':
          event.preventDefault();
          close();
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (highlightedIndex !== -1) {
            items[highlightedIndex].onClick();
            close();
          }
          break;
      }
    },
    [isOpen, items, highlightedIndex, close]
  );

  useEffect(() => {
    if (highlightedIndex !== -1) {
      itemsRef.current[highlightedIndex]?.focus();
    }
  }, [highlightedIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, close, isOpen]);

  return (
    <div className={styles.dropdownContainer} ref={containerRef}>
      <ButtonBase
        ref={triggerRef}
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        variant={variant}
      >
        {trigger}
        <ChevronDown
          size={16}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />
      </ButtonBase>

      <div className={styles.content} data-open={isOpen}>
        {items.map((item, index) => (
          <ButtonBase
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className={styles.item}
            onClick={() => {
              item.onClick();
              close();
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            data-highlighted={highlightedIndex === index}
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
            variant="ghost"
            fullWidth
          >
            {item.label}
          </ButtonBase>
        ))}
      </div>
    </div>
  );
}