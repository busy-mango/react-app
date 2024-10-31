import { Fragment, memo } from 'react';
import { motion } from 'framer-motion';

import {
  iCirclePath,
  iTrigonAdjacent,
  iTrigonOpposite,
  transition,
} from './helpers';

const d = iCirclePath(512, 512, 0);

const MagnifierPath: React.FC = () => (
  <Fragment>
    <motion.path
      animate={{ d: iCirclePath(512, 512, 272) }}
      exit={{ d }}
      initial={{ d }}
      transition={transition}
    />
    <motion.path
      animate={{
        scale: 1,
        d: [
          `M${512 + iTrigonAdjacent(288, 45)} ${512 + iTrigonOpposite(288, 45)}`,
          `L${512 + iTrigonAdjacent(352, 45)} ${512 + iTrigonOpposite(352, 45)}`,
          `L${512 + iTrigonAdjacent(408, 45)} ${512 + iTrigonOpposite(408, 45)}`,
        ].join(' '),
      }}
      exit={{ scale: 0 }}
      initial={{ scale: 0 }}
      transition={transition}
    />
  </Fragment>
);

export const IMagnifierPath = memo(MagnifierPath, (_prev, _next) => true);
