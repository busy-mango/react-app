import { motion } from 'framer-motion';

import LoaderSVG from '@/icons/loader.svg';

import styles from './index.scss';

export const IClipSpinner: React.FC = () => (
  <motion.div
    animate={{
      rotate: 360,
      transition: {
        duration: 0.64,
        repeat: Infinity,
        ease: 'linear',
      },
    }}
    className={styles.icon}
  >
    <LoaderSVG />
  </motion.div>
);
