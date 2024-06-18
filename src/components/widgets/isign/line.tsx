import type { Target, Transition } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';

import { iTrigo } from './helpers';
import type { ISignLineProps, ISignType } from './models';

const initial: Target = {
  d: 'M512 512 L512 512 L512 512',
};

const transition: Transition = {
  duration: 0.15,
  ease: 'easeIn',
};

const iAnimateLine = (type: ISignType): Target[] => {
  switch (type) {
    case 'tick':
      return [{ d: 'M240 516 L458 710 L800 396' }];
    case 'cross':
      return [
        { d: 'M320 320 L512 512 L704 704' },
        { d: 'M704 320 L512 512 L320 704' },
      ];
    case 'info':
      return [{ d: 'M512 256 L512 256 L512 608' }, { d: iTrigo(512, 768, 8) }];
    default:
      return [initial];
  }
};

export const ISignLine: React.FC<ISignLineProps> = ({ type, ring }) => (
  <svg
    height="1em"
    strokeLinecap="round"
    strokeLinejoin="round"
    version="1.1"
    viewBox="0 0 1024 1024"
    width="1em"
  >
    <AnimatePresence>
      {ring && (
        <motion.circle
          cx={512}
          cy={512}
          fill="none"
          r={448}
          stroke="currentColor"
          strokeWidth={64}
          transition={transition}
        />
      )}
      {iAnimateLine(type).map((animate, index) => (
        <motion.path
          key={[type, index].join('-')}
          animate={animate}
          exit={initial}
          fill="none"
          initial={initial}
          stroke="currentColor"
          strokeWidth={64}
          transition={transition}
        />
      ))}
    </AnimatePresence>
  </svg>
);
