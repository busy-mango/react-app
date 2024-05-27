import { motion } from 'framer-motion';

import type { ReactCFC } from '@/models';

import styles from './index.scss';

export interface IPageProps {
  isLoading?: boolean;
  background?: React.ReactNode;
}

export const IMobilePage: ReactCFC<IPageProps> = ({ children, background }) => (
  <motion.article
    animate={{ opacity: 1 }}
    className={styles.page}
    exit={{ opacity: 0 }}
    initial={{ opacity: 0.36 }}
    transition={{ duration: 0.3 }}
  >
    {background && <div className={styles.background}>{background}</div>}
    {children}
  </motion.article>
);
