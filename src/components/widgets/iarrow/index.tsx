import type { Target } from 'framer-motion';
import { motion } from 'framer-motion';

import type { ReactSvgProps } from '@/models';

const d = {
  top: 'M64 596 L512 224 L960 596',
  left: 'M596 64 L224 512 L596 960',
  right: 'M428 64 L800 512 L428 960',
  bottom: 'M64 428 L512 800 L960 428',
};

const initial: Target = {
  d: 'M512 512 L512 512 L512 512',
};

export interface IArrowProps extends ReactSvgProps {
  type: 'bottom' | 'top' | 'left' | 'right';
}

export const IArrow: React.FC<IArrowProps> = ({ type, ...props }) => (
  <svg
    fill="none"
    height="1em"
    stroke="currentColor"
    viewBox="0 0 1024 1024"
    width="1em"
    {...props}
  >
    <motion.path
      animate={{
        d: d[type],
      }}
      initial={initial}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="128"
      transition={{
        duration: 0.3,
        ease: 'easeIn',
      }}
    />
  </svg>
);
