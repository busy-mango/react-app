import { AnimatePresence, motion } from 'framer-motion';

import { IHelperPath } from './helper';
import { iAnimateLine, initial, transition } from './helpers';
import { IMagnifierPath } from './magnifier';
import type { ISignLineProps } from './models';

export const ISignLine: React.FC<ISignLineProps> = ({
  type,
  ring,
  style,
  ...others
}) => (
  <svg
    fill="none"
    height="1em"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={64}
    style={{
      ...style,
      transform: `scale(${ring ? 1 : 1.5})`,
    }}
    version="1.1"
    viewBox="0 0 1024 1024"
    width="1em"
    {...others}
  >
    <AnimatePresence>
      {ring && (
        <motion.circle cx={512} cy={512} r={480} transition={transition} />
      )}
      {type === 'helper' && <IHelperPath />}
      {type === 'magnifier' && <IMagnifierPath />}
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
