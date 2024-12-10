import { ShoppingCart } from "lucide-react";

import { t } from "~/i18n/translate";
import { MapImage } from '~/types/file';

import Button, { ButtonProps } from "~/components/ui/button/Button";
import { Link } from "~/components/ui/link/Link";
import { Title } from "~/components/ui/text/Text";

import { Markdown } from "~/components/markdown/Markdown";
import { Chip } from "~/components/ui/chip/Chip";
import { Quantity } from "~/components/ui/form/quantity/Quantity";
import { Money } from "~/components/ui/money/Money";
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
    <Title size="sm" className={styles.title} itemProp="name">{title}</Title>
  );
}

export function ProductPrice({ priceInCents }: { priceInCents: number }) {
  return (
    <Title className={styles.price} style={{ fontWeight: 700 }}>
      <span className='sr-only'>{t("PRODUCT.PRICE")}</span>
      <Money priceInCents={priceInCents} />
    </Title>
  );
}

export function ProductQuantity() {
  return (
    <div className={styles.quantity}>
      <Quantity
        initialValue={1}
        min={1}
        max={10}
        onChange={(value) => console.log(`New quantity: ${value}`)}
        id="product-quantity" name="product-quantity" type="number" defaultValue="1"
      />
      {/* label="Quantity" */}
    </div>
  )
}

export function ProductButtonAddToCart({ priceHidden, ...props }: ButtonProps & { priceHidden?: boolean }) {
  return (
    <Button variant="outline" size='lg' radius='lg' className={styles['add-to-cart']} fullWidth {...props}>
      <ShoppingCart width={24} height={24} />
      {!priceHidden ? t("ADD_TO_CART") : t("INQUIRE")}
    </Button>
  )
}

export function ProductDescription({ description }: { description: string }) {
  return (
    <Markdown itemProp="description markdown" className={styles.description} body={description} />
  );
}

export function ProductTags({ tags = [] }: { tags?: string[] }) {
  return (
    <div className={styles.tags}>
      <Title as='h4' size='xs'>{t("PRODUCT.TAGS")}</Title>
      <div role="list">
        {tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
    </div>
  );
}
