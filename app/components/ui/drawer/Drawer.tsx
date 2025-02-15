import { cva, type VariantProps } from "class-variance-authority";
import { createContext, PropsWithChildren, useCallback, useContext, useRef } from "react";

import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { useFocus } from "~/hooks/useFocus";
import { useOverflow } from "~/hooks/useOverflow";
import Button, { ButtonProps } from "../button/Button";
import styles from './Drawer.module.css';

const drawerVariants = cva(
  styles.drawer, {
  variants: {
    variant: {
    },
  },
})

type DrawerState = {
  open: boolean;
}

export type DrawerProps = React.DialogHTMLAttributes<HTMLDialogElement> &
  VariantProps<typeof drawerVariants> & {
    onStateChange?({ }: DrawerState): void;
    onClose?: () => void;
    blockDrawer?: boolean;
  }

type DrawerContextValue = DrawerProps & {
  triggerRef?: React.RefObject<HTMLButtonElement>;
  dialogRef?: React.RefObject<HTMLDialogElement>;
  contentId?: string;
  titleId?: string;
  descriptionId?: string;
  drawerClassName?: string;
  toggleDrawer?(): void;
  close?(): void;
};

export const DrawerContext = createContext<DrawerContextValue>({
  toggleDrawer: () => { },
  close: () => { },
  blockDrawer: false
});

export const Drawer = ({ children, className, variant, onStateChange, blockDrawer, onClose, ...props }: DrawerProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { hideScroll, showScroll } = useOverflow({ ref: dialogRef as React.RefObject<HTMLDialogElement> });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!dialogRef.current?.open) return;
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          close();
          break;
      }
    },
    []
  );

  const close = () => {
    dialogRef.current?.close();
    if (blockDrawer) {
      showScroll()
    }
    document.removeEventListener('keydown', handleKeyDown);
    onStateChange?.({ open: false });
    triggerRef.current?.focus();
    onClose?.();
  }

  const open = () => {
    dialogRef.current?.show();
    if (blockDrawer) {
      hideScroll()
    }
    document.addEventListener('keydown', handleKeyDown);
    onStateChange?.({ open: true });
  }

  const handleToggleButton = () => {
    if (dialogRef.current?.open) {
      close();
    } else {
      open();
    }
  }

  return (
    <DrawerContext.Provider
      value={{
        triggerRef,
        dialogRef,
        toggleDrawer: handleToggleButton,
        close,
        drawerClassName: className,
        ...props
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

export const DrawerContent = ({ children, className }: DrawerProps) => {
  const { dialogRef, onKeyDown, close, drawerClassName, triggerRef, variant, toggleDrawer, ...props } = useContext(DrawerContext);
  const { trapFocus } = useFocus({ ref: dialogRef as React.RefObject<HTMLDialogElement> })

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    trapFocus(event);
    onKeyDown?.(event)
  }

  return (
    <dialog
      ref={dialogRef}
      className={clsx(drawerClassName, drawerVariants({ variant }))}
      onKeyDown={handleKeyDown}
      aria-labelledby="drawer_title"
      aria-describedby="drawer_description"
      {...props}
    >
      <div className={styles.backdrop} onClick={close}></div>
      <div className={clsx(styles.content, className)} autoFocus>
        {children}
      </div>
    </dialog>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Trigger
 * -----------------------------------------------------------------------------------------------*/

export type DrawerTriggerProps = PropsWithChildren<{} & ({
  asChild?: boolean;
} | ButtonProps)>

export const DrawerTrigger = ({ asChild, ...props }: DrawerTriggerProps) => {
  const { contentId, triggerRef, dialogRef, toggleDrawer } = useContext(DrawerContext);
  const Comp = asChild ? Slot : Button

  function getState() {
    return dialogRef?.current?.open ? 'open' : 'closed';
  }

  return (
    <Comp
      ref={triggerRef}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={dialogRef?.current?.open}
      aria-controls={contentId}
      data-state={getState()}
      onClick={toggleDrawer}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Extras
 * -----------------------------------------------------------------------------------------------*/

export const DrawerCloseButton = ({ asChild, ...props }: { asChild?: boolean; } | ButtonProps) => {
  const { close } = useContext(DrawerContext);
  const Comp = asChild ? Slot : Button

  return (
    <Comp
      onClick={close}
      id="close_dialog"
      {...props}
    />
  )
}