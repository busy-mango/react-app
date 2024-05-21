import { motion } from 'framer-motion';

import type { ReactSvgProps } from '@/models';

const d = {
  // up: 'M296 596 L 512 416 L 728 596',
  // down: 'M296 428 L 512 608 L 728 428',
  up: 'M64 596 L512 224 L960 596',
  down: 'M64 428 L512 800 L960 428',
};

export interface IArrowProps extends ReactSvgProps {
  type: 'down' | 'up';
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
      initial={{
        d: 'M512 512 L512 512 L512 512',
      }}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="128"
      transition={{
        duration: 0.3,
      }}
    />
  </svg>
);
