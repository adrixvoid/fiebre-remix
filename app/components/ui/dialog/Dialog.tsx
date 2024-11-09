import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { createContext, useContext, useRef } from "react";

import Button, { ButtonProps } from "~/components/ui/button/Button";
import { Title } from "~/components/ui/text/Text";

import { useFocus } from "~/hooks/useFocus";

import { useOverflow } from "~/hooks/useOverflow";
import styles from './Dialog.module.css';

const dialogVariants = cva(
  styles.dialog, {
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

/* -------------------------------------------------------------------------------------------------
 * Dialog
 * -----------------------------------------------------------------------------------------------*/

type DialogState = {
  open: boolean;
}

export type DialogProps = React.DialogHTMLAttributes<HTMLDialogElement> &
  VariantProps<typeof dialogVariants> & {
    children?: React.ReactNode;
    defaultOpen?: boolean;
    onStateChange?({ }: DialogState): void;
    onClose?: () => void;
    blockDialog?: boolean;
  }

type DialogContextValue = DialogProps & {
  triggerRef?: React.RefObject<HTMLButtonElement>;
  dialogRef?: React.RefObject<HTMLDialogElement>;
  contentId?: string;
  titleId?: string;
  descriptionId?: string;
  toggleDialog?(): void;
  close?(): void;
};

const DialogContext = createContext<DialogContextValue>({
  toggleDialog: () => { },
  close: () => { },
  blockDialog: false
});

export const Dialog = ({ onStateChange = () => { }, blockDialog, onClose, children, ...props }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { hideScroll, showScroll } = useOverflow({ ref: dialogRef as React.RefObject<HTMLDialogElement> });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!dialogRef.current?.open) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        close();
        break;
    }
  };

  const open = () => {
    dialogRef.current?.show();
    if (blockDialog) {
      hideScroll()
    } else {
      document.addEventListener('keydown', handleKeyDown);
    }
    onStateChange({ open: true });
  }

  const close = () => {
    dialogRef.current?.close();
    if (blockDialog) {
      showScroll()
    }
    document.removeEventListener('keydown', handleKeyDown);
    onStateChange({ open: false });
    onClose?.();
  }

  const handleToggleButton = () => {
    if (dialogRef.current?.open) {
      close();
    } else {
      open();
    }
  }

  return (
    <DialogContext.Provider
      value={{
        triggerRef,
        dialogRef,
        toggleDialog: handleToggleButton,
        close,
        blockDialog,
        ...props
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

Dialog.displayName = "Dialog";

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

export const DialogContent = ({ children, className }: DialogProps) => {
  const { dialogRef, onKeyDown, close, toggleDialog, blockDialog, triggerRef, variant, ...props } = useContext(DialogContext);
  const { trapFocus } = useFocus({ ref: dialogRef as React.RefObject<HTMLDialogElement> })

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    trapFocus(event);
    onKeyDown?.(event)
  }

  return (
    <dialog
      {...props}
      ref={dialogRef}
      className={clsx(className, { [styles.blockDialog]: blockDialog }, dialogVariants({ variant }))}
      onKeyDown={handleKeyDown}
      aria-labelledby="dialog_title"
      aria-describedby="dialog_description"
    >
      {!blockDialog &&
        <div className={styles.backdrop} onClick={close}></div>
      }
      <div className={clsx(styles.content)} autoFocus>
        {children}
      </div>
    </dialog>
  )
}

DialogContent.displayName = "DialogContent";

/* -------------------------------------------------------------------------------------------------
 * DialogTrigger
 * -----------------------------------------------------------------------------------------------*/

const TRIGGER_NAME = 'DialogTrigger';

type DialogTriggerProps = ButtonProps & {
  asChild?: boolean;
}

export const DialogTrigger = ({ asChild, ...props }: DialogTriggerProps) => {
  const { open, contentId, triggerRef, dialogRef, toggleDialog } = useContext(DialogContext);
  const Comp = asChild ? Slot : Button

  function getState() {
    return dialogRef?.current?.open ? 'open' : 'closed';
  }

  return (
    <Comp
      ref={triggerRef}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={contentId}
      data-state={getState()}
      onClick={toggleDialog}
      {...props}
    />
  );
};

DialogTrigger.displayName = TRIGGER_NAME;


/* -------------------------------------------------------------------------------------------------
 * Extras
 * -----------------------------------------------------------------------------------------------*/

export const DialogDescription = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <p aria-describedby="dialog_description" {...props}>
      {children}
    </p>
  )
}

export const DialogTitle = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <Title id="dialog_title" {...props}>{children}</Title>
}

export const DialogCloseButton = ({ asChild, ...props }: { asChild?: boolean; } | ButtonProps) => {
  const { close } = useContext(DialogContext);
  const Comp = asChild ? Slot : Button

  return (
    <Comp
      onClick={close}
      id="close_dialog"
      {...props}
    />
  )
}

export default {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogCloseButton,
  DialogTitle,
  dialogVariants,
  useFocus
};
