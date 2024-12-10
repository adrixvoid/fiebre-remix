import { accessibilityPrice, formatCurrency } from "~/lib/currency";
import styles from './Money.module.css';

export function Cents({ currency }: { currency: string }) {
  const arrCurrency = currency.split('.');
  const cents = arrCurrency.pop()
  return <>
    <span className={styles.price}>{arrCurrency.join()}</span>
    <span className={styles.cents}>.{cents}-</span>
  </>
}

export function Money({ priceInCents }: { priceInCents: number }) {
  return (
    <>
      <meta itemProp="price" content={String(priceInCents)} />
      <span className="sr-only">{accessibilityPrice(priceInCents)}</span>
      <span
        aria-hidden
        itemProp="offers"
        itemScope={false}
        itemType="http://schema.org/Offer"
      >
        {priceInCents === 0 ? "Gratis" : <Cents currency={formatCurrency(priceInCents)} />}
      </span>

    </>
  );
}