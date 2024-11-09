import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { createContext, forwardRef, KeyboardEvent as ReactKeyboardEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useFocus } from '~/hooks/useFocus';
import { useWindowOverflow } from '~/hooks/useWindowOverflow';
import Button, { ButtonProps } from '../button/Button';
import { ButtonBase } from '../button/ButtonBase';
import styles from './Dropdown.module.css';

type DropdownProps = React.DialogHTMLAttributes<HTMLDivElement> & {
  onStateChange?({ }: { open: boolean }): void;
}

type DropdownContextValues = DropdownProps & {
  triggerRef?: React.RefObject<HTMLButtonElement>;
  containerRef?: React.RefObject<HTMLDivElement>;
  dialogRef?: React.RefObject<HTMLDivElement>;
  itemsRef?: React.MutableRefObject<(HTMLButtonElement | null)[]>

  isOpen: boolean;

  toggleDialog(): void;
  closeDialog(): void;
  openDialog(): void;
};

export const DropdownContext = createContext<DropdownContextValues>({
  closeDialog: () => { },
  openDialog: () => { },
  toggleDialog: () => { },
  isOpen: false,
});


const DefaultTrigger = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
  const { isOpen } = useContext(DropdownContext);
  return (
    <ButtonBase ref={ref} {...props}>
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
});

type DropdownTriggerProps = ButtonProps & {
  asChild?: boolean;
}

export function DropdownTrigger({ asChild, onKeyDown, ...props }: DropdownTriggerProps) {
  const { isOpen, triggerRef, toggleDialog, closeDialog } = useContext(DropdownContext);
  const Comp = asChild ? Slot : DefaultTrigger;

  function getState() {
    return isOpen ? 'open' : 'closed';
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    switch (event.code) {
      case 'Space':
      case 'Spacebar':
        event.preventDefault();
        toggleDialog();
        onKeyDown?.(event);
        break;
    }
  };

  return (
    <Comp
      ref={triggerRef}
      onClick={toggleDialog}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      data-state={getState()}
      onKeyDown={(event: any) => {
        handleKeyDown(event as ReactKeyboardEvent<HTMLButtonElement>);
      }}
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
  const { itemsRef, isOpen, closeDialog } = useContext(DropdownContext);

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
              closeDialog();
            }}
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

type DropdownContentProps = React.DialogHTMLAttributes<HTMLDivElement> & {
  items?: DropdownItem[];
}

export function DropdownContent({ items, children, onKeyDown, ...props }: DropdownContentProps) {
  const { dialogRef, isOpen } = useContext(DropdownContext);
  const { trapFocus } = useFocus({ ref: dialogRef as React.RefObject<HTMLDivElement> })
  const { isOverflow, calculateOverflow } = useWindowOverflow({ ref: dialogRef as React.RefObject<HTMLDivElement> });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    trapFocus(event);
    onKeyDown?.(event)
  }

  useEffect(() => {
    if (isOpen) {
      calculateOverflow();
    }
  }, [isOpen])

  return (
    <div
      rel='dialog'
      ref={dialogRef}
      className={clsx(styles.content, {
        [styles.contentOverflow]: isOverflow
      })}
      onKeyDown={handleKeyDown}
      data-open={isOpen}
      {...props}
    >
      {items ? <DropdownItems items={items} /> : children}
    </div>
  );
}

export function Dropdown({ onStateChange = () => { }, children, ...props }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(props.open || false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const closeDialog = useCallback(() => {
    // dialogRef.current?.close();
    triggerRef.current?.focus();
    setIsOpen(false)
    onStateChange({ open: false });
  }, []);

  const openDialog = () => {
    // dialogRef.current?.show();
    setIsOpen(true)
    onStateChange({ open: true });
  }

  const toggleDialog = () => {
    if (isOpen) {
      closeDialog();
    } else {
      openDialog();
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isOpen) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        closeDialog();
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef?.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeDialog();
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
  }, [closeDialog, isOpen]);

  return (
    <DropdownContext.Provider
      value={{
        triggerRef,
        containerRef,
        dialogRef,
        itemsRef,
        toggleDialog,
        closeDialog,
        openDialog,
        isOpen,
        ...props
      }}
    >
      <div className={styles.dropdownContainer} ref={containerRef}>
        {children}
      </div>
    </DropdownContext.Provider >
  );
}
