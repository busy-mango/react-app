import { Fragment, memo } from 'react';
import { motion } from 'framer-motion';

import {
  iCirclePath,
  initial,
  iTrigoAdjacent,
  iTrigoOpposite,
  transition,
} from './helpers';

const d = iCirclePath(512, 512, 0);

const MagnifierPath: React.FC = () => (
  <Fragment>
    <motion.path
      animate={{ d: iCirclePath(448, 448, 256) }}
      exit={{ d }}
      initial={{ d }}
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

export const IMagnifierPath = memo(MagnifierPath, (_prev, _next) => true);
