import type { Transition } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';

const transition: Transition = {
  duration: 0.2,
  type: 'spring',
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
    <AnimatePresence>
      {checked && (
        <motion.circle
          key="circle"
          cx={512}
          cy={512}
          r={360}
          transition={transition}
        />
      )}
    </AnimatePresence>
  </svg>
);
