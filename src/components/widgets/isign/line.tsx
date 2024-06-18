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
    case 'arrow-top':
      return [
        { d: 'M128 640 L512 256 L896 640' },
        { d: 'M128 640 L512 256 L896 640' },
      ];
    case 'arrow-left':
      return [
        { d: 'M640 128 L256 512 L640 896' },
        { d: 'M640 128 L256 512 L640 896' },
      ];
    case 'arrow-right':
      return [
        { d: 'M384 128 L768 512 L384 944' },
        { d: 'M384 128 L768 512 L384 944' },
      ];
    case 'arrow-bottom':
      return [
        { d: 'M128 384 L512 768 L944 384' },
        { d: 'M128 384 L512 768 L944 384' },
      ];
    case 'tick':
      return [
        { d: 'M240 516 L458 710 L800 396' },
        { d: 'M240 516 L458 710 L800 396' },
      ];
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
    fill="none"
    height="1em"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={64}
    version="1.1"
    viewBox="0 0 1024 1024"
    width="1em"
  >
    <AnimatePresence>
      {ring && (
        <motion.circle cx={512} cy={512} r={448} transition={transition} />
      )}
      {iAnimateLine(type).map((animate, index) => (
        <motion.path
          key={index.toLocaleString()}
          animate={animate}
          exit={initial}
          initial={initial}
          transition={transition}
        />
      ))}
    </AnimatePresence>
  </svg>
);
