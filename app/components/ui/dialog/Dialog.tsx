import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext, useRef } from "react";

import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import useDocument from "~/hooks/useDocument";
import Button, { ButtonProps } from "../button/Button";
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

export function useFocus({ ref }: { ref: React.RefObject<HTMLDialogElement> }) {
  const elements = ref.current?.querySelectorAll(
    'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = elements?.[0];
  const lastElement = elements?.[elements.length - 1];

  const trapFocus = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      const tabForwards = !event.shiftKey && document?.activeElement === lastElement;
      const tabBackwards = event.shiftKey && document?.activeElement === firstElement;

      if (tabForwards) {
        // only TAB is pressed, not SHIFT simultaneously
        // Prevent default behavior of keydown on TAB (i.e. focus next element)
        event.preventDefault();
        (firstElement as HTMLElement).focus();
      } else if (tabBackwards) {
        // TAB and SHIFT are pressed simultaneously
        event.preventDefault();
        (lastElement as HTMLElement).focus();
      }
    }
  }

  return {
    trapFocus
  }
}

export function useOverflow({ ref }: { ref: React.RefObject<HTMLDialogElement> }) {
  const document = useDocument();
  const open = ref.current?.open;

  function hideScroll() {
    let body = document?.querySelector('body');

    if (body) {
      body.style.overflow = "hidden";
    }
  }

  function showScroll() {
    let body = document?.querySelector('body');
    if (body?.attributeStyleMap.has('overflow')) {
      body?.attributeStyleMap.delete('overflow');
    } else if (body?.style.overflow) { // FF Support
      body.style.overflow = "";
    }
  }

  return {
    hideScroll,
    showScroll
  }
}

/* -------------------------------------------------------------------------------------------------
 * Dialog
 * -----------------------------------------------------------------------------------------------*/
export type DialogProps = React.DialogHTMLAttributes<HTMLDialogElement> &
  VariantProps<typeof dialogVariants> & {
    children?: React.ReactNode;
    defaultOpen?: boolean;
    onOpenChange?(open: boolean): void;
    onClose?: () => void
  }

type DialogContextValue = DialogProps & {
  triggerRef?: React.RefObject<HTMLButtonElement>;
  dialogRef?: React.RefObject<HTMLDialogElement>;
  contentId?: string;
  titleId?: string;
  descriptionId?: string;
  dialogClassName?: string;
  onToggleButton(event: React.MouseEvent | React.KeyboardEvent): void;
};

const DialogContext = createContext<DialogContextValue>({
  onToggleButton: () => { },
});

export const Dialog = ({ onOpenChange = () => { }, onClose, children, className, ...props }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { hideScroll, showScroll } = useOverflow({ ref: dialogRef as React.RefObject<HTMLDialogElement> });

  const handleToggleButton = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault();
    if (dialogRef.current?.open) {
      dialogRef.current?.close();
      showScroll()
      onOpenChange(false);
      onClose?.();
    } else {
      dialogRef.current?.show();
      hideScroll()
      onOpenChange(true);
    }
  }

  return (
    <DialogContext.Provider
      value={{
        triggerRef: triggerRef,
        dialogRef: dialogRef,
        onToggleButton: handleToggleButton,
        dialogClassName: className,
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
  const { dialogRef, onKeyDown, onToggleButton, dialogClassName, triggerRef, variant, ...props } = useContext(DialogContext);
  const { trapFocus } = useFocus({ ref: dialogRef as React.RefObject<HTMLDialogElement> })

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    trapFocus(event);
    onKeyDown?.(event)
  }

  return (
    <dialog
      {...props}
      ref={dialogRef}
      className={clsx(dialogClassName, dialogVariants({ variant }))}
      onKeyDown={handleKeyDown}
      aria-labelledby="dialog_title"
      aria-describedby="dialog_description"
    >
      <div className={styles.backdrop} onClick={onToggleButton}></div>
      <div className={clsx(styles.content, className)} autoFocus>
        {children}
      </div>
    </dialog>
  )
}

DialogContent.displayName = "DialogContent";

export const DialogDescription = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <p aria-describedby="dialog_description" {...props}>
      {children}
    </p>
  )
}

export const DialogTitle = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <h2 id="dialog_title" className={clsx(styles.title, className)} {...props}>{children}</h2>
}

export const DialogCloseButton = ({ asChild, ...props }: { asChild?: boolean; } | ButtonProps) => {
  const Comp = asChild ? Slot : Button
  return (
    <Comp
      id="close_dialog"
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------------------------------
 * DialogTrigger
 * -----------------------------------------------------------------------------------------------*/

const TRIGGER_NAME = 'DialogTrigger';

type DialogTriggerProps = ButtonProps & {
  asChild?: boolean;
}

export const DialogTrigger = ({ asChild, ...props }: DialogTriggerProps) => {
  const { open, contentId, triggerRef, dialogRef, onToggleButton } = useContext(DialogContext);
  const Comp = asChild ? Slot : Button

  const handleOnClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    onToggleButton(event)
  }

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
      onClick={handleOnClick}
      {...props}
    />
  );
};

DialogTrigger.displayName = TRIGGER_NAME;

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
