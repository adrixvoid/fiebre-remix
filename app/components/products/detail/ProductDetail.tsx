import { ShoppingCart } from "lucide-react";

import { t } from "~/i18n/translate";
import { accessibilityPrice, formatCurrency } from '~/lib/price';
import { MapImage } from '~/types/file';

import Button, { ButtonProps } from "~/components/ui/button/Button";
import Input from '~/components/ui/form/Input';
import { Link } from "~/components/ui/link/Link";
import { Title } from "~/components/ui/text/Text";

import styles from './ProductDetail.module.css';

export function NavigationBack({ children }: { children: React.ReactNode }) {
  return (
    <nav className={styles.navigation}>
      <Link to="/products">
        <span className="sr-only">{t("PRODUCT.BACK_TO_STORE")}</span>
        <span aria-hidden>{t("BACK")}</span>
      </Link>
    </nav>
  );
}

export function ProductGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.grid}>
      {children}
    </div>
  );
}

export function ProductImagePreview({ src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <div className={styles.preview}>
      <img src={src} aria-hidden {...props} />
    </div>
  );
}

export function ProductGallery({ images }: { images: MapImage[] }) {
  return (
    <div className={styles.gallery}>
      {images.map((image) => (
        <img key={image.fileName} src={image.url} aria-hidden />
      ))}
    </div>
  );
}

export function ProductTitle({ title }: { title: string }) {
  return (
    <Title size="xl" className={styles.title} itemProp="name">{title}</Title>
  );
}

export function ProductPrice({ priceInCents }: { priceInCents: number }) {
  return (
    <p
      className={styles.price}
      itemProp="offers"
      itemScope={false}
      itemType="http://schema.org/Offer"
    >
      <meta itemProp="price" content="35129" />
      <span className='sr-only'>{t("PRODUCT.PRICE")}</span>
      <span className="sr-only">{accessibilityPrice(priceInCents)}</span>
      <span aria-hidden>
        {priceInCents === 0 ? "Gratis" : formatCurrency(priceInCents)}
      </span>
      {priceInCents > 0 && <span className="sr-only">{t('CURRENCY.ARGENTINIAN_PESOS')}</span>}
    </p>
  );
}

export function ProductQuantity() {
  return (
    <div className={styles.quantity}>
      <Input label="Quantity" id="product-quantity" name="product-quantity" type="number" defaultValue="1" />
    </div>
  )
}

export function ProductButtonAddToCart({ priceHidden, ...props }: ButtonProps & { priceHidden?: boolean }) {
  return (
    <Button variant="primary" size="lg" className={styles['add-to-cart']} fullWidth {...props}>
      <ShoppingCart width={24} height={24} />
      {!priceHidden ? t("ADD_TO_CART") : t("INQUIRE")}
    </Button>
  )
}

export function ProductDescription({ description }: { description: string }) {
  return (
    <div itemProp="description" className={styles.description}>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
}

export function ProductTags({ tags = [] }: { tags?: string[] }) {
  return (
    <div className={styles.tags}>
      <span>{t("PRODUCT.TAGS")}</span>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}
