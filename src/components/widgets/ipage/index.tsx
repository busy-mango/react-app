import { AnimatePresence, motion } from 'framer-motion';

import type { ReactCFC } from '@/models';

import { IClipSpinner } from '../ispinners';

import styles from './index.scss';

export interface IPageProps {
  isLoading?: boolean;
  background?: React.ReactNode;
}

export const IPage: ReactCFC<IPageProps> = ({
  children,
  background,
  isLoading,
}) => (
  <motion.article
    animate={{ opacity: 1 }}
    className={styles.page}
    exit={{ opacity: 0 }}
    initial={{ opacity: 0.36 }}
    transition={{ duration: 0.3 }}
  >
    {background && <div className={styles.background}>{background}</div>}
    <AnimatePresence>
      {isLoading && (
        <motion.div
          animate={{ opacity: 1 }}
          className={styles.spin}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0.36 }}
        >
          <IClipSpinner />
        </motion.div>
      )}
      {!isLoading && (
        <motion.div
          animate={{ opacity: 1 }}
          className={styles.area}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0.36 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.article>
);
