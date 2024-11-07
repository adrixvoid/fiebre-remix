import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from 'react';
import useWindow from '~/hooks/useWindow';
import Button, { ButtonProps } from '../button/Button';
import { ButtonBase } from '../button/ButtonBase';
import styles from './Dropdown.module.css';

function useWindowOverflow(ref: React.RefObject<HTMLDivElement>) {
  const [windowOverflow, setWindowOverflow] = useState(false);
  const window = useWindow();

  useEffect(() => {
    const calculateOverflow = () => {
      let coords = ref.current?.getBoundingClientRect() || { right: 0 };
      return (window?.innerWidth || 0) < coords.right
    }

    setWindowOverflow(calculateOverflow());
  }, [])

  return {
    windowOverflow
  }
}

type DropdownContextValues = {
  triggerRef?: React.RefObject<HTMLButtonElement>;
  containerRef?: React.RefObject<HTMLDivElement>;
  itemsRef?: React.MutableRefObject<(HTMLButtonElement | null)[]>


  isOpen: boolean;
  toggle(): void;
  close(): void;
  open(): void;

  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
  highlightedIndex: number;
};

export const DropdownContext = createContext<DropdownContextValues>({
  isOpen: false,
  highlightedIndex: 0,
  setHighlightedIndex: () => { },
  close: () => { },
  open: () => { },
  toggle: () => { }
});

function DefaultTrigger({ children, ...props }: ButtonProps) {
  const { isOpen } = useContext(DropdownContext);
  return (<ButtonBase {...props}>
    {children}
    <ChevronDown
      size={16}
      style={{
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease',
      }}
    />
  </ButtonBase>
  )
};

type DropdownTriggerProps = ButtonProps & {
  asChild?: boolean;
}

export function DropdownTrigger({ asChild, ...props }: DropdownTriggerProps) {
  const { isOpen, triggerRef, toggle } = useContext(DropdownContext);
  const Comp = asChild ? Slot : DefaultTrigger;

  return (
    <Comp
      ref={triggerRef}
      className={styles.trigger}
      onClick={toggle}
      aria-haspopup="true"
      aria-expanded={isOpen}
      {...props}
    />
  )
}

type DropdownItem = ButtonProps & {
  label: React.ReactNode | string;
  onClick?: () => void;
  divider?: boolean;
}

interface DropdownItemsProps {
  items: DropdownItem[];
}

export function DropdownItems({ items }: DropdownItemsProps) {
  const { isOpen, itemsRef, setHighlightedIndex, highlightedIndex, close } = useContext(DropdownContext);

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
            items[highlightedIndex].onClick?.();
            close();
          }
          break;
      }
    },
    [isOpen, items, highlightedIndex, close]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, close, isOpen]);

  useEffect(() => {
    if (highlightedIndex !== -1) {
      itemsRef?.current[highlightedIndex]?.focus();
    }
  }, [highlightedIndex]);

  return (
    <div className={styles.items}>
      {items.map(({ divider, variant, onClick, label, ...item }, index) => (
        <div key={index}>
          {divider && <hr />}
          <Button
            ref={(el) => (itemsRef?.current ? itemsRef.current[index] = el : null)}
            className={clsx(styles.button, {
              [styles.withHover]: !variant,
            })}
            onClick={() => {
              onClick?.();
              close();
            }}
            // onMouseEnter={() => setHighlightedIndex?.(index)}
            data-highlighted={highlightedIndex === index}
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
            variant={variant || "ghost"}
            size='sm'
            fullWidth
            {...item}
          >
            {label}
          </Button>
        </div>
      ))}
    </div>
  )
}

interface DropdownContentProps extends React.PropsWithChildren {
  items?: DropdownItem[];
}

export function DropdownContent({ items, children }: DropdownContentProps) {
  const { isOpen } = useContext(DropdownContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const { windowOverflow } = useWindowOverflow(contentRef);

  return (
    <div
      ref={contentRef}
      className={clsx(styles.content, {
        [styles.contentOverflow]: windowOverflow
      })}
      data-open={isOpen}
    >
      {items ? <DropdownItems items={items} /> : children}
    </div>
  );
}

interface DropdownProps extends PropsWithChildren { }

export function Dropdown({ children, ...props }: DropdownProps) {
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

  const open = useCallback(() => {
    setIsOpen(true);
  }, [])

  const handleToggle = () => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          close();
          break;
      }
    },
    [isOpen, close]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef?.current &&
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
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [close, isOpen]);

  return (
    <DropdownContext.Provider
      value={{
        triggerRef,
        containerRef,
        itemsRef,
        isOpen,
        toggle: handleToggle,
        close,
        open,
        setHighlightedIndex,
        highlightedIndex
      }}
    >
      <div className={styles.dropdownContainer} ref={containerRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}
