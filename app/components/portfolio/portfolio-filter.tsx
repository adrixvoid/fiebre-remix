import clsx from "clsx";
import React from "react";

import { PORTFOLIO_FILTERS } from "../consts";

import { Image } from "@/app/_components/ui/image/Image";
import Link from "@/app/_components/ui/link/Link";
import { Title } from "@/app/_components/ui/text/Text";

import styles from '@/app/_components/portfolio.module.css';
import '@/app/_styles/portfolio.css';

import localSVGStar from '/public/assets/star.svg';

export default function PortfolioFilter(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={styles.filter}>
      {
        PORTFOLIO_FILTERS.map((link) => {
          return (
            <React.Fragment key={link.category}>
              <span><Image src={localSVGStar} aria-hidden="true" alt="estrella" /></span>
              <Title
                as="h3"
                style={{ fontSize: "6cqw" }}
                variant='primary'
              >
                <Link
                  className={clsx({
                    active: link.active,
                  })}
                  href={`#${link.category}`}
                  data-filter-by={link.category}
                >
                  {link.label}
                </Link>
              </Title>
            </React.Fragment>
          );
        })
      }
    </nav>
  );
}
