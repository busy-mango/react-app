import type { Target, Transition } from 'framer-motion';
import { motion } from 'framer-motion';

import type { ReactSvgProps } from '@/models';

const d = {
  top: 'M128 640 L512 256 L896 640',
  left: 'M640 128 L256 512 L640 896',
  right: 'M384 128 L768 512 L384 944',
  bottom: 'M128 384 L512 768 L944 384',
};

const initial: Target = {
  d: 'M512 512 L512 512 L512 512',
};

const transition: Transition = {
  duration: 0.2,
  ease: 'easeIn',
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
      transition={transition}
    />
  </svg>
);
