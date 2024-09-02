import classNames from 'classnames';
import type { SVGMotionProps, Target } from 'framer-motion';
import { motion } from 'framer-motion';

import * as styles from './index.scss';

export interface IClipSpinnerProps extends SVGMotionProps<SVGSVGElement> {
  animate?: Target;
}

export const IClipSpinner: React.FC<IClipSpinnerProps> = ({
  animate,
  className,
  ...others
}) => (
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
    className={classNames(styles.icon, className?.toString())}
    exit={{ x: 0, y: 0 }}
    initial={{ x: 0, y: 0 }}
    viewBox={'22 22 44 44'}
    {...others}
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
      fill={'none'}
      initial={{
        strokeDasharray: '1px, 200px',
        strokeDashoffset: '0px',
      }}
      r={18}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={6.4}
    />
  </motion.svg>
);
