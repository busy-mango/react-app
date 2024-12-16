import type { Transition } from 'motion/react';
import { motion } from 'motion/react';

const transition: Transition = {
  duration: 0.2,
  ease: 'easeIn',
};

export const ICheckedSVG: React.FC<{
  checked?: boolean;
  className?: string;
}> = ({ checked, className, ...others }) => (
  <svg
    className={className}
    fill="currentColor"
    height="1em"
    stroke="none"
    version="1.1"
    viewBox="0 0 1024 1024"
    width="1em"
    {...others}
  >
    <motion.circle
      animate={{ r: checked ? 360 : 0 }}
      cx={512}
      cy={512}
      exit={{ r: 0 }}
      initial={{ r: 0 }}
      transition={transition}
    />
  </svg>
);
