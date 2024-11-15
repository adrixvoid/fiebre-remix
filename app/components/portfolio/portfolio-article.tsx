import clsx from "clsx";

import { CardFooter, CardImage, CardTitle } from "./ui/card/Card";
import Link from "./ui/link/Link";

import { Portfolio } from "@/interfaces/portfolio";
import styles from "./portfolio-article.module.css";

export function getPostsPerCategory(
  posts: Portfolio[],
  categories: string[]
) {
  return posts?.filter((post) => {
    return post.categories?.find((category) =>
      categories.includes(category)
    );
  });
}

export function mergeCategories(categories: string[]) {
  return categories.reduce((acc, curr) => `${acc} ${curr}`);
}


export function PortfolioArticle({ className = "", ...post }) {
  return (
    <article
      className={clsx(styles.item, className)}
      data-categories={mergeCategories(post.categories)}
      data-background={post.background}
      data-color={post.color}
    >
      <Link href={`/portfolio/${post.slug}/`}>
        <div className={styles.card}>
          <CardImage
            className={styles.image}
            width={720}
            height={344}
            src={post.preview}
            aria-hidden="true"
            asCover
          >
            <CardFooter className={styles.footer}>
              <CardTitle className={styles.title}>{post.title}</CardTitle>
            </CardFooter>
          </CardImage>
        </div>
      </Link>
    </article>
  )
}