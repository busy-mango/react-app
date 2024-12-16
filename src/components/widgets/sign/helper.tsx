import { Fragment, memo } from 'react';
import { motion } from 'motion/react';

import {
  iTrigon,
  iTrigonAdjacent,
  iTrigonOpposite,
  transition,
} from './helpers';

const d = `M ${512 - 128} ${256 + 128} A 128 128 0 1 1 ${512 + iTrigonAdjacent(128, 45)} ${256 + 128 + iTrigonOpposite(128, 45)} A 128 128 0 0 0 512 608`;

const HelperPath: React.FC = () => (
  <Fragment>
    <motion.path
      animate={{ scale: 1, d }}
      exit={{ scale: 0, d }}
      initial={{ scale: 0, d }}
      transition={transition}
    />
    <motion.path
      animate={{ d: iTrigon(512, 768, 8) }}
      exit={{ d: iTrigon(512, 512, 0) }}
      initial={{ d: iTrigon(512, 512, 0) }}
      transition={transition}
    />
  </Fragment>
);

export const IHelperPath = memo(HelperPath, (_prev, _next) => true);
