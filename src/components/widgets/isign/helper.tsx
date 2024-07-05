import { Fragment, memo } from 'react';
import { motion } from 'framer-motion';

import {
  initial,
  iTrigo,
  iTrigoAdjacent,
  iTrigoOpposite,
  transition,
} from './helpers';

const d = 'M 0 0 A 0 0 0 1 1 0 0 A 0 0 0 0 0 0 0';

const HelperPath: React.FC = () => (
  <Fragment>
    <motion.path
      animate={{
        d: `M ${512 - 128} ${256 + 128} A 128 128 0 1 1 ${512 + iTrigoAdjacent(128, 45)} ${256 + 128 + iTrigoOpposite(128, 45)} A 128 128 0 0 0 512 608`,
      }}
      exit={{ d }}
      initial={{ d }}
      transition={transition}
    />
    <motion.path
      animate={{ d: iTrigo(512, 768, 8) }}
      exit={initial}
      initial={initial}
      transition={transition}
    />
  </Fragment>
);

export const IHelperPath = memo(HelperPath, (_prev, _next) => true);
