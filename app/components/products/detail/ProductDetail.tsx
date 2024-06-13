import { ShoppingCart } from "lucide-react";
import { MapImage } from '~/types/global.type';
import { accessibilityPrice, getFormattedPrice } from '~/i18n/money';
import { t } from "~/i18n/translate";

import Input from '~/components/form/Input';
import { Link } from "~/components/link/Link";
import Button, { ButtonProps } from "~/components/button/Button";

import styles from './ProductDetail.module.css'

export function NavigationBack({ children }: { children: React.ReactNode }) {
  return (
    <nav className={styles.navigation}>
      <Link to="/products">
        <span className="sr-only">Volver a la tienda</span>
        <span aria-hidden>Volver</span>
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
    <h1 className={styles.title} itemProp="name">{title}</h1>
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
      <span className='sr-only'>Precio:</span>
      <span className="sr-only">{accessibilityPrice(priceInCents)}</span>
      <span aria-hidden>
        {priceInCents === 0 ? "Gratis" : getFormattedPrice(priceInCents)}
      </span>
      {priceInCents > 0 && <span className="sr-only">pesos argentinos</span>}
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
    <Button variant="primary" size="lg" className={styles['add-to-cart']} {...props}>
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
      <span>Tags</span>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}
