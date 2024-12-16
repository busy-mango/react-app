import { Fragment, memo } from 'react';
import { motion } from 'motion/react';

import { initial, transition } from './helpers';

const d = 'M 0 0 A 0 0 0 1 0 0 0 A 0 0 0 1 1 0 0';

const DollarPath: React.FC = () => (
  <Fragment>
    <motion.path
      animate={{
        d: `M ${512 + 128} ${512 - 128} A 128 128 0 1 0 512 512 A 128 128 0 1 1 ${512 - 128} ${512 + 128}`,
      }}
      exit={{ d }}
      initial={{ d }}
      transition={transition}
    />
    <motion.path
      animate={{ d: `M512 ${256 - 32} L512 ${256 - 16} L512 256` }}
      exit={initial}
      initial={initial}
      transition={transition}
    />
    <motion.path
      animate={{ d: `M512 ${768 + 32} L512 ${768 + 16} L512 768` }}
      exit={initial}
      initial={initial}
      transition={transition}
    />
  </Fragment>
);

export const IDollarPath = memo(DollarPath, (_prev, _next) => true);
