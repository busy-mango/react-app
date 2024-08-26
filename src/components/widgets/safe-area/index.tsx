import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import type { ReactCFC, ReactMotionDomProps, WrapperProps } from '@/models';

import { IClipSpinner } from '../spinners';

import styles from './index.scss';

export interface ISafeAreaProps extends ReactMotionDomProps<WrapperProps> {
  isLoading?: boolean;
  background?: React.ReactNode;
}

export const ISafeArea: ReactCFC<ISafeAreaProps> = ({
  children,
  className,
  background,
  isLoading,
  ...others
}) => (
  <motion.article
    data-page
    animate={{ opacity: 1 }}
    className={styles.page}
    exit={{ opacity: 0 }}
    initial={{ opacity: 0.36 }}
    transition={{ duration: 0.3 }}
  >
    <AnimatePresence>
      {background && (
        <motion.div className={styles.background}>{background}</motion.div>
      )}
      {isLoading ? (
        <motion.div
          animate={{ opacity: 1 }}
          className={styles.spin}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0.36 }}
        >
          <IClipSpinner />
        </motion.div>
      ) : (
        <motion.div
          data-safe-area
          animate={{ opacity: 1 }}
          className={classNames(styles.area, className)}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0.36 }}
          transition={{ duration: 0.3 }}
          {...others}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.article>
);
