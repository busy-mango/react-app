import { Fragment } from 'react/jsx-runtime';
import { motion } from 'framer-motion';

import {
  iCirclePath,
  initial,
  iTrigoAdjacent,
  iTrigoOpposite,
  transition,
} from './helpers';

export const IMagnifierPath: React.FC = () => (
  <Fragment>
    <motion.path
      animate={{ d: iCirclePath(448, 448, 256) }}
      exit={{ d: iCirclePath(512, 512, 0) }}
      initial={{ d: iCirclePath(512, 512, 0) }}
      transition={transition}
    />
    <motion.path
      animate={{
        d: [
          `M${448 + iTrigoAdjacent(256, 45)} ${448 + iTrigoOpposite(256, 45)}`,
          `L${448 + iTrigoAdjacent(352, 45)} ${448 + iTrigoOpposite(352, 45)}`,
          `L${448 + iTrigoAdjacent(448, 45)} ${448 + iTrigoOpposite(448, 45)}`,
        ].join(' '),
      }}
      exit={initial}
      initial={initial}
      transition={transition}
    />
  </Fragment>
);
