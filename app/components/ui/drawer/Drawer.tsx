import { cva, type VariantProps } from "class-variance-authority";
import { createContext, PropsWithChildren, useContext, useRef } from "react";

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
      // flex: styles.flex,
      // text: styles['center-text'],
      // all: [styles.flex, styles.flex]
    },
    // direction: {
    //   row: styles.row,
    //   column: styles.column,
    // }
  },
  // defaultVariants: {
  //   variant: "flex",
  //   direction: "row",
  // },
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
  drawerRef?: React.RefObject<HTMLDialogElement>;
  contentId?: string;
  titleId?: string;
  descriptionId?: string;
  drawerClassName?: string;
  toggleDrawer?(): void;
  close?(): void;
};

const DrawerContext = createContext<DrawerContextValue>({
  toggleDrawer: () => { },
  close: () => { },
  blockDrawer: false
});

export const Drawer = ({ children, className, variant, onStateChange, blockDrawer, onClose, ...props }: DrawerProps) => {
  const drawerRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { hideScroll, showScroll } = useOverflow({ ref: drawerRef as React.RefObject<HTMLDialogElement> });

  const close = () => {
    drawerRef.current?.close();
    if (blockDrawer) {
      showScroll()
    }
    onStateChange?.({ open: false });
    onClose?.();
  }

  const open = () => {
    drawerRef.current?.show();
    if (blockDrawer) {
      hideScroll()
    }
    onStateChange?.({ open: true });
  }

  const handleToggleButton = () => {
    if (drawerRef.current?.open) {
      close();
    } else {
      open();
    }
  }

  return (
    <DrawerContext.Provider
      value={{
        triggerRef,
        drawerRef,
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
  const { drawerRef, onKeyDown, close, drawerClassName, triggerRef, variant, toggleDrawer, ...props } = useContext(DrawerContext);
  const { trapFocus } = useFocus({ ref: drawerRef as React.RefObject<HTMLDialogElement> })

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    trapFocus(event);
    onKeyDown?.(event)
  }

  return (
    <dialog
      {...props}
      ref={drawerRef}
      className={clsx(drawerClassName, drawerVariants({ variant }))}
      onKeyDown={handleKeyDown}
      aria-labelledby="drawer_title"
      aria-describedby="drawer_description"
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

export type DrawerTriggerProps = PropsWithChildren<{
  asChild?: boolean;
  open?: boolean;
}>

export const DrawerTrigger = ({ asChild, ...props }: DrawerTriggerProps) => {
  const { open, contentId, triggerRef, drawerRef, toggleDrawer } = useContext(DrawerContext);
  const Comp = asChild ? Slot : Button

  function getState() {
    return drawerRef?.current?.open ? 'open' : 'closed';
  }

  return (
    <Comp
      ref={triggerRef}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={open}
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