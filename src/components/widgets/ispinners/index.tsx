import { motion } from 'framer-motion';

import styles from './index.scss';

export const IClipSpinner: React.FC = () => (
  <motion.svg
    layout
    animate={{
      rotate: [0, 180, 360],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: 'linear',
      },
    }}
    className={styles.icon}
    viewBox={'22 22 44 44'}
  >
    <motion.circle
      animate={{
        strokeDasharray: ['1px, 200px', '100px, 200px', '100px, 200px'],
        strokeDashoffset: ['0px', '-15px', '-125px'],
        transition: {
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      className={styles.icon}
      cx={44}
      cy={44}
      initial={{
        strokeDasharray: '1px',
        strokeDashoffset: '0px',
      }}
      r={18}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4.2}
    />
  </motion.svg>
);
