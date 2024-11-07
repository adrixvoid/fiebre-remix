import { cx } from "class-variance-authority";
import { atom, useAtom } from 'jotai';
import { forwardRef } from "react";

import { formatCurrency } from "~/lib/price";
import { ErrorMessage } from "./ErrorMessage";
import { InputBaseProps } from "./InputBase";
import styles from './InputBase.module.css';
import stylesPrice from './InputPrice.module.css';
import { Label } from "./Label";

export interface InputPriceProps extends InputBaseProps {
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: string;
}

export const priceAtom = atom<number | undefined>(undefined);

const InputPrice = forwardRef<HTMLInputElement, InputPriceProps>(
  ({ label, labelProps, id, name, error, className, onChange, defaultValue, ...rest }, ref) => {
    const [priceInCents, setPriceInCents] = useAtom(priceAtom);

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
      setPriceInCents(Number(e.target.value) || undefined)
      onChange?.(e);
    }

    return (
      <>
        {label && <Label id={id} name={name} {...labelProps}>{label}</Label>}
        <input
          ref={ref}
          className={cx(styles.input, className)}
          name={name}
          id={id}
          {...rest}
          value={priceInCents || Number(defaultValue)}
          onChange={handleOnChange}
        />
        <label htmlFor={name} className={stylesPrice.text}>{formatCurrency((priceInCents || Number(rest.defaultValue) || 0) / 100)}</label>
        <ErrorMessage name={name} error={error} />
      </>
    )
  }
)


InputPrice.displayName = "InputPrice"

export { InputPrice };

