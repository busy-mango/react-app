import { AnimatePresence, motion } from 'framer-motion';

import { IDollarPath } from './dollar';
import { IHelperPath } from './helper';
import { iAnimateLine, initial, transition } from './helpers';
import { IMagnifierPath } from './magnifier';
import type { ISignLineProps } from './models';

export const ISignLine: React.FC<ISignLineProps> = ({
  type,
  rect,
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
      transform: `scale(${ring || rect ? 1 : 1.325})`,
    }}
    version="1.1"
    viewBox="0 0 1024 1024"
    width="1em"
    {...others}
  >
    <AnimatePresence>
      {ring && (
        <motion.circle
          key="circle"
          cx={512}
          cy={512}
          r={480}
          transition={transition}
        />
      )}
    </AnimatePresence>
    <AnimatePresence>
      {rect && (
        <motion.rect
          key="rect"
          height={960}
          rx={256}
          transition={transition}
          width={960}
          x={32}
          y={32}
        />
      )}
    </AnimatePresence>
    <AnimatePresence>
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
    <AnimatePresence>
      {type === 'dollar' && <IDollarPath key="dollar" />}
      {type === 'helper' && <IHelperPath key="helper" />}
      {type === 'magnifier' && <IMagnifierPath key="magnifier" />}
    </AnimatePresence>
  </svg>
);
