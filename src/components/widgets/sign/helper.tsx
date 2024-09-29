import { Fragment, memo } from 'react';
import { motion } from 'framer-motion';

import {
  initial,
  iTrigon,
  iTrigonAdjacent,
  iTrigonOpposite,
  transition,
} from './helpers';

const d = 'M 0 0 A 0 0 0 1 1 0 0 A 0 0 0 0 0 0 0';

const HelperPath: React.FC = () => (
  <Fragment>
    <motion.path
      animate={{
        d: `M ${512 - 128} ${256 + 128} A 128 128 0 1 1 ${512 + iTrigonAdjacent(128, 45)} ${256 + 128 + iTrigonOpposite(128, 45)} A 128 128 0 0 0 512 608`,
      }}
      exit={{ d }}
      initial={{ d }}
      transition={transition}
    />
    <motion.path
      animate={{ d: iTrigon(512, 768, 8) }}
      exit={initial}
      initial={initial}
      transition={transition}
    />
  </Fragment>
);

export const IHelperPath = memo(HelperPath, (_prev, _next) => true);
