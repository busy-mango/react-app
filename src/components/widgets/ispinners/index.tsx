import { motion } from 'framer-motion';

import LoaderSVG from '@/icons/loader.svg';

import styles from './index.scss';

export const IClipSpinner: React.FC = () => (
  <motion.div
    animate={{
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
      transformOrigin: 'center center',
    }}
    className={styles.icon}
  >
    <LoaderSVG />
  </motion.div>
);
