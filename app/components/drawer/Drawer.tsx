import { cva, type VariantProps } from "class-variance-authority";
import { useEffect, useRef } from "react";

import useDocument from "~/hooks/useDocument";
import styles from './Drawer.module.css';

const drawerVariants = cva(
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

export type DrawerProps = React.DialogHTMLAttributes<HTMLDialogElement> &
  VariantProps<typeof drawerVariants> & {
    open: boolean;
    onClose: (event: React.MouseEvent | React.KeyboardEvent) => void
  }

export const Drawer = ({ children, className, variant, open, onClose, ...props }: DrawerProps) => {
  const document = useDocument();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const elements = dialogRef.current?.querySelectorAll(
    'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = elements?.[0];
  const lastElement = elements?.[elements.length - 1];

  const handleOnClose = (event: React.MouseEvent | React.KeyboardEvent) => {
    dialogRef.current?.close();
    onClose(event);
  }

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

  useEffect(() => {
    let body = document?.querySelector('body');

    if (open && body) {
      body.style.overflow = "hidden";
    } else {
      if (body?.attributeStyleMap.has('overflow')) {
        body?.attributeStyleMap.delete('overflow');
      } else if (body?.style.overflow) { // FF Support
        body.style.overflow = "";
      }
    }

    return () => {
      body = null;
    }
  }, [open, document])

  return (
    <dialog ref={dialogRef} open={open} className={drawerVariants({ variant, className })} {...props} onClose={onClose} onKeyDown={trapFocus}>
      <div className={styles.backdrop} onClick={handleOnClose}></div>
      <div className={styles.content}>
        {children}
      </div>
    </dialog>
  );
}