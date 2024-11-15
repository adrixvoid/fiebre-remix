import { Portfolio } from '@/interfaces/portfolio';
import { PortfolioArticle } from './portfolio-article';

import styles from '@/app/_components/portfolio.module.css';
import './portfolio-related.css';
import { Grid } from './ui/grid/Grid';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  posts: Portfolio[];
};

function PortfolioRelated({ posts, className, ...props }: Props) {
  return (
    <Grid {...props}>
      {posts.map((post) => <PortfolioArticle className={styles.article} {...post} />)}
    </Grid>
  )
}

export default PortfolioRelated;