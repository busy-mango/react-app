import { Fragment, memo } from 'react';
import { motion } from 'framer-motion';

import {
  iCirclePath,
  initial,
  iTrigonAdjacent,
  iTrigonOpposite,
  transition,
} from './helpers';

const d = iCirclePath(512, 512, 0);

const MagnifierPath: React.FC = () => (
  <Fragment>
    <motion.path
      // animate={{ d: iCirclePath(448, 448, 256) }}
      animate={{ d: iCirclePath(512, 512, 272) }}
      exit={{ d }}
      initial={{ d }}
      transition={transition}
    />
    <motion.path
      animate={{
        d: [
          `M${512 + iTrigonAdjacent(288, 45)} ${512 + iTrigonOpposite(288, 45)}`,
          `L${512 + iTrigonAdjacent(352, 45)} ${512 + iTrigonOpposite(352, 45)}`,
          `L${512 + iTrigonAdjacent(408, 45)} ${512 + iTrigonOpposite(408, 45)}`,
        ].join(' '),
      }}
      exit={initial}
      initial={initial}
      transition={transition}
    />
  </Fragment>
);

export const IMagnifierPath = memo(MagnifierPath, (_prev, _next) => true);
